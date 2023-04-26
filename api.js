const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { error } = require('console');

/**
 * 
 * @param {string} route 
 * @returns {boolean} 
 */
const existsRoute = (route) => fs.existsSync(route);
/**
 * Si recibe una ruta absoluta la retorna sin modificarla
 * Si recibe una ruta relativa la convierte en absoluta y la retorna
 * @param {string} route 
 * @returns {string} ruta absoluta
 */
const getAbsolutePath = (route) => path.isAbsolute(route) ? route : path.resolve(route);
// crear archivo md para probar las funciones auxiliares
//-------------------------------------------------console.log(getAbsolutePath('README.md')); ----------------------------------------------------------
// crear función que valide si el archivo es md con extname (extension md)y buscar si la extension es .md
// la función se describe con operador ternario y que devuelva solo los archivos .md, en index se pasa con if

function fileExt(newRoute) {
  return path.extname(newRoute) === ".md";
  //mdFiles.push(newRoute);
};

// lee el archivo y devuelve un string
function readFiles(newRoute) {
  return new Promise((resolve, reject) => {
    fs.readFile(newRoute, 'utf8', (error, data) => {
      if (error) {
        console.log('Failed to read file');
        reject(error)
      } else {
        resolve(data)
      }
    });
  })
};

// --esta función toma el string y compara si tiene https(link) y devuelve un arreglo con los links
function extractLinks(fileContent) {
  // filecontent=dsiudhiqdwhuqdwidhu](https...
  const regExp = /\[(.+)\]\((https?:\/\/\w+.+)\)/g;
  //expresión regular que toma el string (cadena de texto) para obtener el link (URL) completo en 1 grupo, se usa .+ para hacer match con 1 o más caracteres dentro de [()]
  const arrayUrl = fileContent.match(regExp);
  //devuelve un arreglo de links
  return arrayUrl;//[ '[Google](https://www.google.com)', '[Google](https://www.google.com)']
};

readFiles('README.md')
  .then((result) => {
    extractLinks(result, 'README.md')
  })


// --urlToObjects toma el arreglo de links y lo transforma en un arreglo de objetos con .map
function urlToObjects(arrayUrl, newRoute) {
  return arrayUrl.map((element) => {
    return {
      href: element.slice(element.indexOf('](h') + 2, -1),
      text: element.slice(1, element.indexOf(']')),
      file: newRoute
    };
  });
}
//console.log(urlToObjects(arrayUrl, newRoute));

function validUrl(urlToObjects) {
  // usamos map para asignar cada objeto a una promesa de validación
  const validatePromises = urlToObjects.map((element) => {
    return fetch(element.href)
      .then((response) => {
        return {
          // ... es un operador de propagación, crea un nuevo objeto que contiene todas las propiedades del objeto de entrada, 
          // (continuación así como prop adicionales que agrega fx validUrl
          ...element,
          status: response.status,
          statusText: response.statusText,
          isValid: response.ok,
        };
      })
      .catch((error) => {

        return {
          ...element,
          status: null,
          statusText: 'Error',
          isValid: false,
        };
      });
  });
  return Promise.all(validatePromises)
    .then((validatedObjects) => {
      return validatedObjects;
    })
}


//  --integrar funciones aux en mdLinks



module.exports = {
  existsRoute,
  getAbsolutePath,
  fileExt,
  readFiles,
  extractLinks,
  urlToObjects,
  validUrl,
}; 
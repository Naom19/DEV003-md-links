const fs = require('fs');
const path = require('path');

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

// abrir el archivo
archivo = open('ruta que me pusieron al ejecutar el api en terminal')

resultado = extractLinks(archivo)
arreglodeObjetos = extraerObjectos(resultado)

// --urlToObjects toma el arreglo de links y lo transforma en un arreglo de objetos con .map
const urlToObjects =  arrayUrl.map((element) => {
    return {
    // agregamos las propiedades:
     href: element.slice(element.indexOf('](h') + 2, -1),
     text: element.slice(1, element.indexOf(']')),
     file: fileContent // o newRoute?
   };
});

//  --función validUrl toma el arreglo de los objetos y valida los links

function validUrl(urlToObjects) {
    
}

//  --integrar funciones aux en mdLinks



module.exports.existsRoute = existsRoute;
module.exports.getAbsolutePath = getAbsolutePath;
module.exports.fileExt = fileExt;
module.exports.readFiles = readFiles;
module.exports.extractLinks = extractLinks;

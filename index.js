const { 
  existsRoute,
  getAbsolutePath, 
  fileExt, 
  readFiles, 
  extractLinks, 
  urlToObjects,
  validUrl,
} = require('./api.js');


// Definimos la función mdLinks que recibe 2 parámetros y devuelve una nueva promesa (asíncrona)
const mdLinks = (route, options) => {
  // nota las opciones son objetos
  // La nueva promesa toma un callback con sus parámetros-funciones resolve y reject (relacionados a then y catch)
  return new Promise(async (resolve, reject) => {
    // nota: Promise es un constructor que recibe una función callback que tiene resolve y reject como parámetros
    // A) Identificar si la ruta existe
    if (!existsRoute(route)) {
      // B) Si no existe se rechaza la promesa (reject) 
      reject('The route does not exist');
      // reject se puede llamar con un argumento para rechazar
      return; // patron de early return que asegura que no continue ejecutando la función
    } 
    // Evaluar si la ruta es absoluta, en caso de que no convertirla
    const newRoute = getAbsolutePath(route);
    // Revisar si la ruta absoluta es un file o directorio
    // En caso de que sea un directorio: filtra archivos md y resuelve un Array de objetos(links)
    let mdFiles = [];
   
    if (fileExt(newRoute)) {
      mdFiles.push(newRoute);
    }
    // Aquí añadimos el manejo de directorios (pendiente)
   
    try {
      const fileContents = await Promise.all(
        mdFiles.map((file) => readFiles(file))
      );
    
    
    const allLinks = fileContents.flatMap((fileContent)) => 
      extractLinks(fileContent)
    );

    const linkObjects = allLinks.map((link, index) => {
      return{
        href:
        text:
        file:
      };
    });

    if (options && options.validate) {
      const validatedLinks = await validUrl(linkObjects);
      resolve(validatedLinks);
    } else {
      resolve(linkObjects);
    }
  } catch (error) {
    reject("Error procesando archivos md / Error processing Markdown files");
  }
});
};

//console.log(existsRoute);

mdLinks('C:\\Users\\Naomi\\DEV003-md-links\\README.md').then( () => {

}).catch( (error) => {
  console.log(error);
})

// resolve se va a invocar al final
// nota una vez terminada la función mdLinks, se va a ejecutar en CLI (donde se imprime con console.log)
// las funciones pequeñas de api.js tienen que ser funciones puras

module.exports = () => {
  // ...
  mdLinks
};



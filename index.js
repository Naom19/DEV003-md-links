const {
  existsRoute,
  getAbsolutePath,
  fileExt,
  readFiles,
  extractLinks,
  urlToObjects,
  linkObjects,
  validUrl,
} = require('./api.js');

const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
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

    Promise.all(mdFiles.map((file) => readFiles(file)))
      .then((fileContents) => {
        const allLinks = fileContents.flatMap((fileContent) => {
          return extractLinks(fileContent);
        });

        const linkObjects = urlToObjects(allLinks, mdFiles);

        if (options && options.validate) {
          //llamar validUrl
          validUrl(linkObjects)
            .then((validatedObjects) => {
              resolve(validatedObjects);
            })
            .catch((error) => {
              reject("Error validando URLs/ Error validating URLs");
            });
        } else {
          resolve(linkObjects);
        }
      }) .catch ((error) => {
          reject("Error procesando archivos md / Error processing md files")
      });
});
};

//console.log(existsRoute);

mdLinks('C:\\Users\\Naomi\\DEV003-md-links\\README.md', { validate: true })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// resolve se va a invocar al final
// nota una vez terminada la función mdLinks, se va a ejecutar en CLI (donde se imprime con console.log)
// las funciones pequeñas de api.js tienen que ser funciones puras

module.exports = () => {
  mdLinks
};




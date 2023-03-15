const fs = require('fs');

// Definimos la función mdLinks que recibe 2 parámetros y devuelve una nueva promesa (asíncrona)
 const mdLinks = (path, options) => {
// La nueva promesa toma un callback con sus parámetros-funciones resolve y reject (relacionados a then y cach)
  return new Promise ((resolve, reject) => {
  // A) Identificar su la ruta existe
    if(fs.existsSync(path)) {
    // Evaluar si la ruta es absoluta, en caso de que no convertirla
    // Revisar si la ruta absoluta es un file o directorio
    // En caso de que sea un directorio: filtra archivos md y resuelve un Array de objetos(links)
    }else {
    // B) Si no existe se rechaza la promesa (reject) 
    reject('The route does not exist');
    // reject se puede llamar con un argumento para rechazar
    } 

  });
};

module.exports = () => {
  // ...
  mdLinks
};

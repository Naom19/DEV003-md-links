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


module.exports.existsRoute = existsRoute;
module.exports.getAbsolutePath = getAbsolutePath;
module.exports.fileExt = fileExt;
const { mdLinks } = require('./index');
// fn para obtener el valor del path

/* mdLinks('./notvalidroute/').then(() => {

})
.cach((error) => {
    console.log(error);
});
console.log() */

const path = process.argv[2]
const validate = process.argv.includes('--validate') || process.argv.includes('--v');
const stats = process.argv.includes('--stats') || process.argv.includes('--s');
// fn para obtener el valor de options
const options = { validate, stats };

//fn para total links
const totalLinks = (link) => {
    const total = link.length;
    return total;
};

//fn para uniqueLinks
const uniqueLinks = (link) => {
    const href = link.map(links => links.href);
    return uniqueHrefs.size;
};

//fn para links rotos
const brokenLinks = (link) => {
    const failMessage = link.filter(links => links.ok ==='fail');
    const uniqueFails = new Set(failMessage);
    return uniqueFails.size;
};


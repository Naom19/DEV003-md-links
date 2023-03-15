const { mdLinks } = require('./index');
mdLinks('./notvalidroute/').then(() => {

})
.cach((error) => {
    console.log(error);
});
console.log()
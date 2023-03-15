const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  /*
  //probando que mdLinks devuelva una promesa
  it('should return a Promise', () => {
    expect(mdLinks()).toBe(typeof Promise);
  });
*/
  it('Should reject Promise when the Path does not exist', () => {
    return mdLinks('./user/file/noExiste.md').cach((error) => {
      expect(error).toBe('This path does not exist');
    })
  });

});

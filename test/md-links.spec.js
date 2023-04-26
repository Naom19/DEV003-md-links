const { 
  mdLinks,
  readFiles,
  validUrl, } = require('../index.js');


/*describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  
  //probando que mdLinks devuelva una promesa
  it('should return a Promise', () => {
    expect(mdLinks()).toBe(typeof Promise);
  });

  it('Should reject Promise when the Path does not exist', () => {
    return mdLinks('./user/file/noExiste.md').cach((error) => {
      expect(error).toBe('This path does not exist');
    })
  });

}); */

// Test de 2 funciones asíncronas: 

//-----------Test función readFiles----------- 
describe('readFiles', () => {
  it('should read a file and return its content as a string/debería leer un archivo y retornar el contenido como string', async () => {
   
    const fs = require('fs');
    const path = require('path');
    const tempFilePath = path.join(__dirname, 'temp_test.md');
    const expectedContent = 'This is a test file/ Archivo de prueba';
    fs.writeFileSync(tempFilePath, expectedContent, 'utf8');

    try {
      // Probamos la función readFiles
      const content = await readFiles(tempFilePath);
      expect(content).toBe(expectedContent);
    } finally {
      // Limpiamos el archivo de prueba temporal
      fs.unlinkSync(tempFilePath);
    }
  });

  it('should reject with an error when the file does not exist/En caso de que el archivo no exista rechaza con error', async () => {
    const filePath = 'nonexistent.md';
    await expect(readFiles(filePath)).rejects.toThrowError(/Failed to read file/);
  });
});


// ----------Test función validUrl------------
describe('validUrl', () => {
  it('should validate URLs and return an array of validated objects', async () => {
    const input = [
      { href: 'https://www.example.com', text: 'Example', file: 'README.md' },
      { href: 'https://www.google.com', text: 'Google', file: 'README.md' },
    ];

    const expectedOutput = [
      {
        href: 'https://www.example.com',
        text: 'Example',
        file: 'README.md',
        status: 200,
        statusText: 'OK',
        isValid: true,
      },
      {
        href: 'https://www.google.com',
        text: 'Google',
        file: 'README.md',
        status: 200,
        statusText: 'OK',
        isValid: true,
      },
    ];

    const result = await validUrl(input);
    expect(result).toMatchObject(expectedOutput);
  });

  it('should return an array with isValid set to false for invalid URLs', async () => {
    const input = [
      { href: 'https://www.invalid-url.com', text: 'Invalid', file: 'README.md' },
    ];

    const result = await validUrl(input);
    expect(result[0].isValid).toBe(false);
  });
});


const express = require('express');
const path = require('path');

const app = express();

// // /images é o caminho/end-point da API onde as imagens estarão disponíveis
// // path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// // a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

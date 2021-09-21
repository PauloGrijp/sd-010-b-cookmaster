const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
/* Adicionado de acordo com o readme
// ./src/api/app.js

const path = require('path');
// ...

// /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// ...
 */

app.post('/users', (_req, res) => {
  res.status(200).json({ message: 'Listagem de usuários' });
});

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

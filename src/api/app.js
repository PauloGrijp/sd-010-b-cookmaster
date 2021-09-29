const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
  destination: (request, file, callback) => callback(null, path
    .resolve(__dirname, '..', 'uploads')),
  filename: (request, file, callback) => callback(null, `${request.params.id}.jpeg`),
});

const upload = multer({ storage });

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
app.use('/images', express.static(path.resolve(__dirname, '..', 'uploads')));
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;

const express = require('express');
const patch = require('path');

const app = express();

app.use('/images', express.static(patch.join(__dirname, '...', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

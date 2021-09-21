const express = require('express');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users');
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

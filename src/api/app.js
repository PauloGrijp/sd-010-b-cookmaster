const express = require('express');

const users = require('../routes/Users');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// -------------------------------------------------------------

app.use(express.json());

app.use(users);

module.exports = app;

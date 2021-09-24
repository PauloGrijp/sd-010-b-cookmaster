const express = require('express');
const bodyParser = require('body-parser');
const { usersRouter } = require('../controller/usersController');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// ------------------------------------------------------------------
// Requisito 1, 2: Rota Users e Login

app.use('/', usersRouter);

// ------------------------------------------------------------------

module.exports = app;

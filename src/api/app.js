const express = require('express');
const bodyParser = require('body-parser');
const { usersRouter } = require('../controller/usersController');
const { recipesRouter } = require('../controller/recipesController');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// ------------------------------------------------------------------
// Requisitos 1, 2: Rota de Users e Login

app.use('/', usersRouter);

// ------------------------------------------------------------------
// Requisito 3: Rota de Recipes

app.use('/recipes', recipesRouter);

// ------------------------------------------------------------------

module.exports = app;

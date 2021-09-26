const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { usersRouter } = require('../controller/usersController');
const { recipesRouter } = require('../controller/recipesController');
const { imagesRouter } = require('../controller/imagesController');

const app = express();

app.use(bodyParser.json());

const staticDestination = path.join(__dirname, '..', 'uploads');
app.use(express.static(staticDestination));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// ------------------------------------------------------------------
// Requisitos 1, 2: Rota de Users e Login

app.use('/', usersRouter);

// ------------------------------------------------------------------
// Requisitos 3, 4, 5, 7, 8, 9: Rota de Recipes

app.use('/recipes', recipesRouter);

// ------------------------------------------------------------------
// Requisito 10: Rota de Imagens

app.use('/images', imagesRouter);

// ------------------------------------------------------------------

module.exports = app;

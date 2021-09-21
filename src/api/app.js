const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../../middlewares/errorController');
const { UserController, RecipesController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/recipes', auth, RecipesController.create);

app.get('/recipes/:id', RecipesController.getOne);

app.get('/recipes', RecipesController.getAll);

app.post('/users', UserController.create);

app.post('/login', UserController.login);

app.use(errorMiddleware);

module.exports = app;

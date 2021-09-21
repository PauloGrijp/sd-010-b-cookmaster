const express = require('express');
const bodyParser = require('body-parser');

const { login } = require('../controllers/usersController');
const recipesRouter = require('../routers/recipesRouter');
const usersRouter = require('../routers/usersRouter');

const app = express();
app.use(bodyParser.json());

app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);
app.post('/login', login);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

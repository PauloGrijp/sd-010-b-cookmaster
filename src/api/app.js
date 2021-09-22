const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('../controllers/usersControllers');
const recipesController = require('../controllers/recipesController');
const AppError = require('../utils/appError');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersController.create);
app.post('/login', usersController.login);

app.post('/recipes', recipesController.create);

app.use((err, _req, res, _next) => {
  const { code, message } = err;
  if (err instanceof AppError) {
    return res.status(code).json({ message });
  }
  return res.status(err.status).json({ message: err.message });
});

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controller/userController');
const recipesController = require('./controller/recipesController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.createUser);
app.post('/login', userController.login);

app.post('/recipes', recipesController.createRecipes);

module.exports = app;
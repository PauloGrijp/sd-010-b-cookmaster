const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');
const RecipeController = require('../controllers/RecipeController');
const jwt = require('../auth/Jwt');

const app = express();
app.use(bodyParser.json());

app.post('/users', UserController.createUser);
app.post('/login', LoginController.login);
app.post('/recipes', jwt, RecipeController.createRecipe);
app.get('/recipes', RecipeController.getAllRecipes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

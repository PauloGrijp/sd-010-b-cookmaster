const express = require('express');
const bodyParser = require('body-parser');
const validateJWT = require('./auth/validateJWT');
const UsersController = require('../controllers/UsersController');
const LoginController = require('../controllers/LoginController');
const RecipesController = require('../controllers/RecipesController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UsersController.createUser);

app.post('/login', LoginController.loginUser);

app.post('/recipes', validateJWT, RecipesController.createRecipe);
app.get('/recipes', RecipesController.recipesList);
app.get('/recipes/:id', RecipesController.findRecipeById);

module.exports = app;

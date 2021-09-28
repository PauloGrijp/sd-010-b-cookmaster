const express = require('express');
const bodyParser = require('body-parser');
const validateJWT = require('./auth/validateJWT');
const UsersController = require('../controllers/UsersController');
const LoginController = require('../controllers/LoginController');
const RecipeController = require('../controllers/RecipeController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UsersController.createUser);
app.post('/login', LoginController.loginUser);
app.post('/recipes', validateJWT, RecipeController.createRecipe);
app.get('/recipes', RecipeController.getRecipes);
app.get('/recipes/:id', RecipeController.findById);

module.exports = app;

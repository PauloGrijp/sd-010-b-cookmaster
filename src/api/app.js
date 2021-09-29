const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipeController');
const { jwtValidation } = require('../middlewares/jwtValidation');

const app = express();
app.use(bodyParser.json());

app.post('/users', userController.userCreate); // req 1

app.post('/login', loginController.userLogin); // req 2

app.post('/recipes', jwtValidation, recipeController.registerRecipe); // req 3

app.get('/recipes', recipeController.findAllRecipes); // req 4

app.get('/recipes/:id', recipeController.findRecipeById); // req 5

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const recipesController = require('../controllers/recipesController');

const app = express();
app.use(bodyParser.json());

// Users endpoints:
app.post('/users', userController.createNewUser);
app.post('/login', userController.login);

// Recipes endpoints:

app.post('/recipes', recipesController.createNewRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipeById);
app.put('/recipes/:id', recipesController.updateRecipe);
app.delete('/recipes/:id', recipesController.deleteRecipe);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

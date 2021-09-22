const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('../controllers/usersControllers');
const RecipesController = require('../controllers/recipesControllers');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

// USERS
app.post('/users', UsersController.registerUsers);
app.post('/login', UsersController.loginUser);

// RECEITAS
app.get('/recipes/:id', RecipesController.getOneRecipes);
app.get('/recipes', RecipesController.getAllRecipes);
app.post('/recipes', RecipesController.registerRecipes);

module.exports = app;

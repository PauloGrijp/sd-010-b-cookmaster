const express = require('express');
const bodyParser = require('body-parser');
const validateToken = require('./auth/validateJWT');
const usersController = require('../../controllers/usersController');
const recipesController = require('../../controllers/recipesController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app
  .route('/users')
  .post(usersController.createUser);

app
  .route('/login')
  .post(usersController.login);

app
  .route('/recipes/:id')
  .get(recipesController.getById)
  .put(validateToken, recipesController.updateRecipe);

app
  .route('/recipes')
  .get(recipesController.getRecipes)
  .post(validateToken, recipesController.createRecipe);

module.exports = app;

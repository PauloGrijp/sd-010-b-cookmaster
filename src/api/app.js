const express = require('express');
const bodyParser = require('body-parser');

const {
  requestNewUser,
  requestLogin,
} = require('../Controllers/users');

const {
  requestNewRecipe,
  requestListRecipes,
  requestRecipeById,
  requestEditRecipe,
} = require('../Controllers/recipes');

const {
  isValidName,
  isValidEmail,
  isValidIngredients,
  isValidPreparation,
  fieldEmail,
  fieldPassword,
  isValidUpdate,
} = require('../middlewares/middlewares');

const {
  verifyToken,
} = require('../middlewares/tokenValidation');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

app.post('/users', isValidName, isValidEmail, requestNewUser);

app.post('/login', fieldEmail, fieldPassword, requestLogin);

app.get('/recipes/:id', requestRecipeById);

app.get('/recipes/', requestListRecipes);

app.post('/recipes',
  verifyToken,
  isValidName,
  isValidPreparation,
  isValidIngredients,
  requestNewRecipe);

app.put('/recipes/:id',
  verifyToken,
  isValidUpdate,
  requestEditRecipe);

module.exports = app;

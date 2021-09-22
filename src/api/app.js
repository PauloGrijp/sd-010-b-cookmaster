const express = require('express');
const bodyParser = require('body-parser');

const {
  requestNewUser,
  requestLogin,
} = require('../Controllers/users');

const {
  requestNewRecipe,
} = require('../Controllers/recipes');

const {
  isValidName,
  isValidEmail,  
  fieldEmail,
  fieldPassword,
} = require('../middlewares/users');

const {
  isValidIngredients,
  isValidPreparation,
} = require('../middlewares/recipes');

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

app.post('/recipes',
  isValidName,
  isValidPreparation,
  isValidIngredients,
  verifyToken,
  requestNewRecipe);

module.exports = app;

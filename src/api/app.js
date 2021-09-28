const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const {
  validateEmail,
  validateFields,
  emailExists,
  validateRecipe,
} = require('../middlewares/validations');
const { validToken } = require('../middlewares/validateJWT');

const app = express();

app.use(bodyParser.json());

app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipeById);

app.post('/users',
  validateFields,
  validateEmail,
  emailExists,
  usersController.createUser);
app.post('/login', usersController.userLogin);
app.post('/recipes', validToken, validateRecipe, recipesController.createRecipe);

app.put('/recipes/:id', validToken, validateRecipe, recipesController.updateRecipe);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

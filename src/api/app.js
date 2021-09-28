const express = require('express');
const bodyParser = require('body-parser');

const { authValidation, authValidationWithAdmin } = require('../auth/authMiddleware');

const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipeController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.route('/users')
  .post(userController.createUser);

app.route('/login')
  .post(loginController.login);

app.route('/recipes')
  .post(authValidation, recipeController.create)
  .get(recipeController.getAll);

app.route('/recipes/:id')
  .get(recipeController.getById)
  .put(authValidationWithAdmin, recipeController.updateRecipe);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const validateJWT = require('../authentication/validateJWT');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.registerUser);

app.post('/users/admin', userController.registerAdmin);

app.post('/login', loginController.userLogin);

app.post('/recipes', validateJWT, recipesController.registeringRecipes);

app.get('/recipes', recipesController.getAllRecipes);

app.get('/recipes/:id', recipesController.getRecipeId);

module.exports = app;

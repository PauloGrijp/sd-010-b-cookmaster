const express = require('express');
const bodyParser = require('body-parser');

const { createUser, login } = require('../controllers/userController');
const { createRecipe } = require('../controllers/recipesController');
const { isValidUser } = require('../middlewares/userMiddleware');
const { isValidLogin } = require('../middlewares/loginMiddleware');
const { isValidRecipe } = require('../middlewares/recipeMiddleware');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', isValidUser, createUser);
app.post('/login', isValidLogin, login);
app.post('/recipes', validateJWT, isValidRecipe, createRecipe);

module.exports = app;

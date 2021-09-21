const express = require('express');
const bodyParser = require('body-parser');

const { createUser, login } = require('../controllers/userController');
const { createRecipe, getAllRecipes, findRecipe } = require('../controllers/recipesController');
const { isValidUser } = require('../middlewares/userMiddleware');
const { isValidLogin } = require('../middlewares/loginMiddleware');
const { isValidRecipe, existsRecipe } = require('../middlewares/recipeMiddleware');
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

app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', existsRecipe, findRecipe);
app.post('/recipes', validateJWT, isValidRecipe, createRecipe);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { 
  createUsers, 
  login, 
  createRecipes, 
  allRecipes, 
  recipeById,
  editRecipe,
} = require('./routes');

const { 
  userValidation, 
  validateEmail,
  userLogin, 
  validatePwd, 
  dataValidation,
  isValidRecipe,
} = require('../services/index');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const apiRoutes = express.Router();

apiRoutes.post('/users', userValidation, validateEmail, createUsers)
          .post('/login', userLogin, validatePwd, login)
          .post('/recipes', dataValidation, validateJWT, createRecipes)
          .get('/recipes', allRecipes)
          .get('/recipes/:id', isValidRecipe, recipeById)
          .put('/recipes/:id', validateJWT, isValidRecipe, editRecipe);

app.use(apiRoutes);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const userController = require('../../controllers/userController');
const recipeController = require('../../controllers/recipeController');
const validateJWT = require('../../middlewares/validateJWT');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.createUser);

app.post('/login', userController.loginUser);

app.post('/recipes', validateJWT, recipeController.createRecipe);

module.exports = app;

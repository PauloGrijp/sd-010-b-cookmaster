const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../middleware/error');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');
const { validateToken } = require('../middleware/validateToken');

const app = express();
app.use(bodyParser.json());

app.post('/users', userController.createUser);
app.post('/login', loginController.loginUser);
app.post('/recipes', validateToken, recipesController.createRecipes);
app.get('/recipes', recipesController.getRecipesAll);
app.get('/recipes/:id', recipesController.getRecipeId);
app.put('/recipes/:id', validateToken, recipesController.updateRecipe);
app.delete('/recipes/:id', validateToken, recipesController.deleteRecipe);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

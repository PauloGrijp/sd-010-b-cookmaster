const express = require('express');
const bodyparser = require('body-parser');
const userController = require('../controllers/userControllers');
const loginController = require('../controllers/loginControllers');
const recipeController = require('../controllers/recipesControllers');
const validateJwt = require('../middlewares/validationJwt');

const app = express();
app.use(bodyparser.json());

// Rota de criação do usuário
app.post('/users', userController.createUser);
// Rota de login do usuário
app.post('/login', loginController.loginUser);
// Rota de criação da receita
app.post('/recipes', validateJwt, recipeController.createRecipesController);
// Rota para listar todas as receitas
app.get('/recipes', recipeController.getAllRecipes);
// Rota para pesquisar receita pelo id
app.get('/recipes/:id', recipeController.getRecipeById);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

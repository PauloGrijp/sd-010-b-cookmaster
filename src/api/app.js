const express = require('express');
const bodyParser = require('body-parser');
const user = require('../controllers/UsersControllers');
const login = require('../controllers/LoginControllers');
const recipes = require('../controllers/RecipesControllers');
const validate = require('../services/autentication');

const app = express();
app.use(bodyParser.json());


// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.post('/users', user.createItem);
app.post('/login', login.login);
app.post('/recipes', validate, recipes.createItem);
app.get('/recipes', recipes.getAll)

module.exports = app;

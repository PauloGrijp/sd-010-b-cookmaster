const express = require('express');
const bodyParser = require('body-parser');
const Middlewares = require('../middlewares');
const validateJWT = require('./auth/validateJWT');

const Controllers = require('../controllers');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send();
});

app.post('/users', Controllers.user.create);
app.post('/login', Controllers.user.login);

app.use(Middlewares.userError);

app.get('/recipes', Controllers.recipe.listRecipes);
app.post('/recipes', validateJWT, Controllers.recipe.create);
app.get('/recipes/:id', Controllers.recipe.findRecipe);
app.put('/recipes/:id', validateJWT, () => {});

app.use(Middlewares.recipeError);

module.exports = app;

// {
//   "name" : "Erick Jacquin",
//   "email" : "erickjacquin@gmail.com",
//   "password" : "12345678",
//   "role" : "user"
// }

// {
//   "name" : "Receita do Jacquin",
//   "ingredients" : "Frango",
//   "preparation" : "10 minutos no forno"
// }

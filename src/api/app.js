const express = require('express');
const bodyParser = require('body-parser');
const User = require('./controllers/controllersUsers');
const Recipe = require('./controllers/controllersRecipes');
const { validateToken } = require('./schema/validateJWT');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', User.create);
app.post('/login', User.login);
app.post('/recipes', validateToken, Recipe.createRecipe);

app.get('/recipes', Recipe.getAll);
app.get('/recipes/:id', Recipe.getRecipeById);

module.exports = app;

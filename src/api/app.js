const express = require('express');
const bodyParser = require('body-parser');

const Users = require('./controllers/Users');
const Recipes = require('./controllers/Recipes');
const errorMiddleware = require('./middlewares/error');
const { validateToken } = require('./middlewares/validateJWT');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', Users.registerNewUser);
app.post('/login', Users.loginUser);

app.get('/recipes', Recipes.getAllRecipes);
app.post('/recipes', validateToken, Recipes.registerNewRecipe);

app.use(errorMiddleware);

module.exports = app;

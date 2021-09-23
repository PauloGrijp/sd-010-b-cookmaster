const express = require('express');
const bodyParser = require('body-parser');
const routesUsers = require('../routes/users_routes');
const routesRecipes = require('../routes/recipes_routes');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(routesUsers);
app.use(routesRecipes);

module.exports = app;

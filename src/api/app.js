const express = require('express');
const bodyParser = require('body-parser');
const users = require('../router/users');
const login = require('../router/login');
const recipes = require('../router/recipes');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);
app.use('/login', login);
app.use('/recipes', recipes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

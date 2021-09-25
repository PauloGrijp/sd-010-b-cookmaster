const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('../router/users');
const login = require('../router/login');
const recipes = require('../router/recipes');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);
app.use('/login', login);
app.use('/recipes', recipes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

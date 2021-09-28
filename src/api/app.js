const express = require('express');
const patch = require('path');
const { users, login, recipes } = require('../routers');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use('/login', login);
app.use('/recipes', recipes);
app.use('/users', users);
app.use('/images', express.static(patch.join(__dirname, '..', 'uploads')));

module.exports = app;

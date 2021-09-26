const express = require('express');

const app = express();
const users = require('../routes/users');
const login = require('../routes/login');
const recipes = require('../routes/recipes');
const { validateToken } = require('../middlewares/validateToken');

app.use(express.json());
app.use('/users', users);
app.use('/login', login);
app.use('/recipes', validateToken, recipes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const usersRoute = require('../router/usersRoute');
const loginRoute = require('../router/loginRoute');
const recipesRoute = require('../router/recipesRoute');

const app = express();
app.use(bodyParser.json());

app.get('/', (_req, res) => res.status(200).json({ message: 'I\'m feelin\' good!!!' }));
app.use('/users', usersRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipesRoute);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

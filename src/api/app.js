const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const UsersRouter = require('../routes/Users');
const LoginRouter = require('../routes/Login');
const RecipesRouter = require('../routes/Recipes');

const app = express();

app.use(bodyParser.json());

app.use('/users', UsersRouter);
app.use('/login', LoginRouter);
app.use('/recipes', RecipesRouter);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

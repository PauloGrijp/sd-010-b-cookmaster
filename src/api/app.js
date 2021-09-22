const express = require('express');
const path = require('path');
const appRoutes = require('./routes');
const handleErrors = require('../middlewares/errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', appRoutes.users);
app.use('/login', appRoutes.login);
app.use('/recipes', appRoutes.recipes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(handleErrors);

module.exports = app;

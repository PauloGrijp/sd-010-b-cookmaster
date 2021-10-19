const express = require('express');

const app = express();
app.use(express.json());

const { usersRoute, loginRoute, recipesRoute } = require('./routes');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipesRoute);
app.use('/images', express.static('src/uploads/'));

module.exports = app;

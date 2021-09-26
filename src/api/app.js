const express = require('express');

const usersRoute = require('../routes/usersRoute');

const app = express();

app.use('/users', usersRoute);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

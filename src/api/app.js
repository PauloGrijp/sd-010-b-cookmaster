const express = require('express');
const userController = require('./controllers/userController');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.post('/users', userController.createUser);

module.exports = app;

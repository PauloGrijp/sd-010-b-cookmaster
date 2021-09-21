const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');

const app = express();
app.use(bodyParser.json());

// User endpoints:
app.post('/users', userController.createNewUser);
app.post('/login', userController.login);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

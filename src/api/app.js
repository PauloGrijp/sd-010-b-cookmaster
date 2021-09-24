const express = require('express');
const bodyparser = require('body-parser');
const userController = require('../controllers/userControllers');
const loginController = require('../controllers/loginControllers');

const app = express();
app.use(bodyparser.json());

// Rota de criação do usuário
app.post('/users', userController.createUser);
// Rota de login do usuário
app.post('/login', loginController.loginUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

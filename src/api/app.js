const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('../controllers/UsersController');
const loginController = require('../controllers/LoginController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.addNewUser);

app.post('/login', loginController.goLogin);

module.exports = app;

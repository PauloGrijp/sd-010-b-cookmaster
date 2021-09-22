const express = require('express');
const bodyParser = require('body-parser');
const {
  requestNewUser,
  requestLogin,
} = require('../Controllers/users');

const {
  isValidName,
  isValidEmail,
  fieldEmail,
  fieldPassword,
} = require('../middlewares/users');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

app.post('/users', isValidName, isValidEmail, requestNewUser);

app.post('/login', fieldEmail, fieldPassword, requestLogin);

module.exports = app;

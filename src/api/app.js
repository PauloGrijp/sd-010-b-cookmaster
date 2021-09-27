const bodyParser = require('body-parser');
const express = require('express');
const usersControllers = require('../controllers/usersController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersControllers.create);
app.post('/login', usersControllers.login);

module.exports = app;

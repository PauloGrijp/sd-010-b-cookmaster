const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');

const app = express();
app.use(bodyParser.json());

app.post('/users', userController.userCreate); // req 1

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;

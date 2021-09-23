const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../middleware/error');
const userController = require('../controllers/userController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.post('/users', userController.createUser);

app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

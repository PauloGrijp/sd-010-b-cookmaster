const express = require('express');
const bodyParser = require('body-parser');

const errorMiddleware = require('../middlewares/error');
const validateMiddleware = require('../middlewares/validationMidd');
const userController = require('../controllers/userController');

const app = express();

app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', validateMiddleware, userController.createUser);

app.use(errorMiddleware);

module.exports = app;

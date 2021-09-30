const express = require('express');
const bodyParser = require('body-parser');
const { userCheck } = require('../controller/userValidation');
const { createAction } = require('../controller/createUser');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userCheck, createAction);

module.exports = app;

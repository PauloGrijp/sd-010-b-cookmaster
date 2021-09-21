const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const { validateInput } = require('../middlewares/validateUser');
const { validateEmailExist } = require('../model/verifyUser');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

app.post('/users/', [validateInput, validateEmailExist]);

module.exports = app;

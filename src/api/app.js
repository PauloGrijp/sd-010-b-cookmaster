const express = require('express');
const bodyParser = require('body-parser');
const { requestNewUser } = require('../Controllers/users');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

app.post('/users', requestNewUser);

module.exports = app;

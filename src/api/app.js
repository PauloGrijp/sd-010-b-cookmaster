const express = require('express');

const bodyParser = require('body-parser');

const userRoute = require('../controller/users');

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoute);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

const bodyParser = require('body-parser');
const express = require('express');
const router = require('../router/router');
const middlewareError = require('../middleware/error');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);

app.use(middlewareError);

module.exports = app;

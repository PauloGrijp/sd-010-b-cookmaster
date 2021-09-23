const express = require('express');
const bodyParser = require('body-parser');

const rota = require('../1routes/rota66');

const app = express();
app.use(bodyParser.json());

app.use('/', rota);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send('Ola sumido!!!!');
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

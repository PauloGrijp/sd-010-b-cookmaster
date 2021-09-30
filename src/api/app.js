const express = require('express');
const bodyParser = require('body-parser');
const erroMidd = require('../midd/erro');
const rotas = require('./routes');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use('/users', rotas.Users);
app.use(erroMidd);

module.exports = app;

// este projeto esta sendo executado com ajuda de colegas e pesquisas
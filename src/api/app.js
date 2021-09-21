const bodyParser = require('body-parser');
const express = require('express');
const routeUser = require('../reqs/routes/routeUser');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

app.use('/users', routeUser);

module.exports = app;

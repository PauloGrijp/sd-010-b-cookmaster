const express = require('express');
const router = require('../router');
const { errorMiddleware } = require('../middlewares');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/', router);

app.use(errorMiddleware);

module.exports = app;

const express = require('express');
const routers = require('../routers');
const middlewares = require('../middlewares');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', routers.users);
// app.use('/users', routers.recipes);

app.use(middlewares.errorMiddleware);

module.exports = app;

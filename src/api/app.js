const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const usersRouter = require('../routers/usersRouter');
const loginRouter = require('../routers/loginRouter');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(usersRouter);
app.use(loginRouter);

module.exports = app;

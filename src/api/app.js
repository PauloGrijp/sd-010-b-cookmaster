const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const usersRouter = require('./routers/user');
const loginRouter = require('./routers/login');

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/login', loginRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

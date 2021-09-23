const express = require('express');

const erro = require('./middlewares/erro');

const users = require('./routes/users');
// const login = require('./routes/login');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', users);
app.use('/login', users);
app.use(erro);

module.exports = app;

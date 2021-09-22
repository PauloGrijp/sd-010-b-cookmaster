const express = require('express');
const bodyParser = require('body-parser');
const { 
userRouter, 
loginRouter,
} = require('../routers');
const erroMiddleware = require('../middlewareErro');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador!

app.use('/users', userRouter);

app.use('/login', loginRouter);

app.use(erroMiddleware);

module.exports = app;

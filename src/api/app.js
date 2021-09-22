const express = require('express');
const bodyParser = require('body-parser');

const errorMiddleware = require('../middlewares/errorMiddleware');

const userRouter = require('./userRouter');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(errorMiddleware);

module.exports = app;

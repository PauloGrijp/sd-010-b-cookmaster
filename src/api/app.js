const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser').json();

const app = express();
app.use(express.json());
app.use(bodyParser);
require('dotenv').config();

const userRouter = require('../routers/userRouter');
const loginRouter = require('../routers/loginRouter');

// Controller Create 
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRouter);
app.use('/login', loginRouter);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

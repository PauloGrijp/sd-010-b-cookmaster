const express = require('express');
const path = require('path');
const bodyParser = require('body-parser').json();

const app = express();

// cria uma url para acessar um arquivo a partir do navegador!!

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(express.json());
app.use(bodyParser);
require('dotenv').config();

const userRouter = require('../routers/userRouter');
const loginRouter = require('../routers/loginRouter');
const recipesRouter = require('../routers/recipesRouter');

// Controller Create 
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

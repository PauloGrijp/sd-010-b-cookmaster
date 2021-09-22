const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// POST USER
const userRouter = require('../routers/userRouter');

app.use('/users', userRouter);

// POST LOGIN
const loginRouter = require('../routers/loginRouter');

app.use('/login', loginRouter);

// POST RECIPE
const recipeRouter = require('../routers/recipeRouter');

app.use('/recipes', recipeRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;

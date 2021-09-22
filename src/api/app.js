const express = require('express');

const app = express();
app.use(express.json());

const userRouter = require('../controllers/Users');
const loginRouter = require('../controllers/Login');
const recipeRouter = require('../controllers/Recipes');

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipeRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

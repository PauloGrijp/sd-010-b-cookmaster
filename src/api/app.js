const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const userRouter = require('../controllers/Users');
const loginRouter = require('../controllers/Login');
const recipesRouter = require('../controllers/Recipes');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
module.exports = app;

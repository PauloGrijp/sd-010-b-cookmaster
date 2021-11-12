const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const pathImage = path.resolve(__dirname, '..', 'uploads');

const app = express();

app.use(bodyParser.json());

const userRouter = require('../controllers/Users');
const loginRouter = require('../controllers/Login');
const recipesRouter = require('../controllers/Recipes');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use('/images', express.static(pathImage));

module.exports = app;

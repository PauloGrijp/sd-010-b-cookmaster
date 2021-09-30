const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador 

const userRouter = require('../controllers/userController');
const loginRouter = require('../controllers/loginController');
const recipesRouter = require('../controllers/recipesController');

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;

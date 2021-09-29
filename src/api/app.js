const express = require('express');
const usersRoute = require('./routes/usersRoute');
const loginRoute = require('./routes/loginRoute');
const recipeRoute = require('./routes/recipeRoute');
const errorMid = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use('/users', usersRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipeRoute);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(errorMid);

module.exports = app;

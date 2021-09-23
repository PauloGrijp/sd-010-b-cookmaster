const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const usersRouter = require('./routers/usersRouter');
const loginRouter = require('./routers/loginRouter');
const recipesRouter = require('./routers/recipesRouter');

app.use(bodyParser.json());

// Rotas
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

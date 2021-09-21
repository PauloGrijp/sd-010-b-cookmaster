const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/usersRouters');
const loginRouter = require('./routes/loginRouter');
const recipesRouter = require('./routes/recipesRouter');

const app = express();
app.use(bodyParser());

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

app.use((err, _req, res, _next) => res.status(err.status).json(err.error));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

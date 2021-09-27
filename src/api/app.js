const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

const usersRouter = require('./routers/usersRouter');
const loginRouter = require('./routers/loginRouter');
const recipesRouter = require('./routers/recipesRouter');

app.use(bodyParser.json());

// acesso à pasta src/uploads através da rota '/images'
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

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

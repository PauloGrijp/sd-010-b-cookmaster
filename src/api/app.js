const express = require('express');

const path = require('path');
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const recipesRouter = require('./routes/recipesRouter');
const { handleError } = require('./middleware/globalErrors');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use((err, req, res, _next) => {
  handleError(err, res);
});

module.exports = app;

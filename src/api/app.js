const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const errorMiddleware = require('../middlewares/errorMiddleware');

const userRouter = require('./usersRouter');
const recipesRouter = require('./recipesRouter');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(userRouter);
app.use(recipesRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(errorMiddleware);

module.exports = app;

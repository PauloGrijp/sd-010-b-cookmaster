const bodyParser = require('body-parser');
const express = require('express');

const userRouter = require('../routes/userRouter');
const recipesRouter = require('../routes/recipesRouter');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(userRouter);
app.use(recipesRouter);

module.exports = app;

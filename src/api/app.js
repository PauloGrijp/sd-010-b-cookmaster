const express = require('express');
const bodyParser = require('body-parser');

const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');

const app = express();
app.use(bodyParser.json());

app.use('/login', loginRouter);

app.use('/users', userRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

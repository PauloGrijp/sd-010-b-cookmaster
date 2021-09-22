const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('../routes/users');
const { login } = require('../controllers/login');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRouter);

app.post('/login', login);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

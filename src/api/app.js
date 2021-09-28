const express = require('express');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador 

const userRouter = require('../controllers/userController');
const loginRouter = require('../controllers/loginController');

app.use('/users', userRouter);
app.use('/login', loginRouter);

module.exports = app;

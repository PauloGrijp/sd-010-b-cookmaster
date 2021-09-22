const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRouter = require('../routes/userRoute');
const loginRouter = require('../routes/loginRoute');
const recipesRouter = require('../routes/recipesRoute');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;

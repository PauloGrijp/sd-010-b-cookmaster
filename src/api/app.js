const express = require('express');
const bodyParser = require('body-parser');
const ErrorMid = require('../midd/err');
const loginRoutes = require('../routes/loguinRouter');
const app = express();
const userRoutes = require('../routes/userRoutes');

app.use(bodyParser.json());
// usersRoutes
app.use('/users', userRoutes);
app.use('/login', loginRoutes);

app.use(ErrorMid);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

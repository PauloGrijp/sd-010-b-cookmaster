const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userRoutes = require('../routes/userRoutes');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// usersRoutes
app.use('/users', userRoutes);

module.exports = app;

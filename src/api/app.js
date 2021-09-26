const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('../routes/users.route');
const loginRoutes = require('../routes/login.route');
const error = require('../middlewares/error');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use(error);

module.exports = app;
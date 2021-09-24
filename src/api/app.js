const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('./controllers/userController');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

/* rota para users */
app.post('/users', User.createUser);

module.exports = app;

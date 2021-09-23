const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const { createNewUser,
        userLogin,
} = require('../controller/controllerUser');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

app.post('/users', [createNewUser]);

app.post('/login', [userLogin]);

module.exports = app;

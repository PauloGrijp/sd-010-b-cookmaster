const express = require('express');
const bodyParser = require('body-parser');
const routerUsers = require('../routers/userRouters');
const routerLogin = require('../routers/loginRouters');

// const validadeJWT = require('../auth/validateJWT');

const app = express();
app.use(bodyParser.json());

app.use('/users', routerUsers);
app.use('/login', routerLogin);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

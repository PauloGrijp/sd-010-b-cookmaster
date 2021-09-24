const express = require('express');
const bodyParser = require('body-parser');
const routerUsers = require('../routers/userRouters');
const routerLogin = require('../routers/loginRouters');
const routerRecipes = require('../routers/routerRecipes');

// const validadeJWT = require('../auth/validateJWT');

const app = express();
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/uploads`));

app.use('/users', routerUsers);
app.use('/login', routerLogin);
app.use('/recipes', routerRecipes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

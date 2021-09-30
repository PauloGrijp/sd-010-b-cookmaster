const express = require('express');
const bodyParser = require('body-parser');

const usersRoute = require('../routes/usersRoute');
const loginRoute = require('../routes/loginRoute');
const recipesRoute = require('../routes/recipesRoute');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(`${__dirname}/../uploads`));
app.use('/users', usersRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipesRoute);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

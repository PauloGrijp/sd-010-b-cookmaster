const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const error = require('../middlewares/erro');
const usersRoute = require('../routes/usersRoute');

app.use(bodyParser.json());

usersRoute(app);
app.use(error);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

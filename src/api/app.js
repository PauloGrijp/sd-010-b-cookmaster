const express = require('express');

const app = express();
const apiRoutes = express.Router();
const routes = require('./routes');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

apiRoutes.post('/users', routes.createUsers);

app.use(Error);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const apiRoutes = express.Router();

app.use(bodyParser.json());
app.use(apiRoutes);

apiRoutes.post('/users', routes.createUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;

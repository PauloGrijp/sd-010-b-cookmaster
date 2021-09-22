const express = require('express');
const bodyParser = require('body-parser');
const user = require('../controllers/user');
// const routes = require('./routes');

const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);
app.use('/', user);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { createUserC } = require('../controllers/usersController');

const app = express();
const erro = require('../middlewares/erro');

app.use(bodyParser.json());
app.post('/users', rescue(createUserC));
app.use(erro);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
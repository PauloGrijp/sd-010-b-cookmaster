const express = require('express');
const bodyParser = require('body-parser');

const { createUser } = require('../controllers/userController');
const { isValidUser } = require('../middlewares/userMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', isValidUser, createUser);

module.exports = app;

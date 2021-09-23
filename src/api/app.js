const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const usersController = require('../controllers/usersController');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.post('/users', usersController.registerNewUser);

module.exports = app;

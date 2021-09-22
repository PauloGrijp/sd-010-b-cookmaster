const express = require('express');
const path = require('path');
const bodyParser = require('body-parser').json();
const usersController = require('../controller/userController');

const app = express();
app.use(express.json());
app.use(bodyParser);
require('dotenv').config();

// Controller Create 
app.use('/users', usersController);
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

const express = require('express');
const path = require('path');
const Login = require('../controllers/login');
const RegisterUser = require('../controllers/registerUser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', RegisterUser);

app.post('/login', Login);

module.exports = app;

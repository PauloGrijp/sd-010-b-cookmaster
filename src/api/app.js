const express = require('express');
const path = require('path');
const { login } = require('../controllers/login');
const { registerUser } = require('../controllers/registerUser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', registerUser);

app.post('/login', login);

module.exports = app;

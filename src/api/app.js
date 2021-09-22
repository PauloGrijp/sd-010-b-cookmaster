const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersRoutes);

module.exports = app;

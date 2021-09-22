const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = require('../routes/routes');

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/users', router.users);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const middlewareError = require('../middlewares/erro');

const app = express();
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(bodyParser.json());
app.use(middlewareError);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', controllers.createUser);

module.exports = app;

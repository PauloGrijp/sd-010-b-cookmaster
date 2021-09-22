const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const usersRouter = require('./routers/user');

/* const productController = require('./controller/productController');
const salesController = require('./controller/salesController'); */

app.use(bodyParser.json());

app.use('/users', usersRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

const express = require('express');

const bodyParser = require('body-parser');
const { errorMidllewares } = require('../middlewares/errorsMiddlewares');

const router = require('../routers/routers');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use(router);
app.use(errorMidllewares);

module.exports = app;

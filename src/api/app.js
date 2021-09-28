const express = require('express');
const path = require('path');

const router = require('../router');

const { errorMiddleware } = require('../middlewares');

const app = express();

app.use('/src/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use('/', router);

app.use(errorMiddleware);

module.exports = app;

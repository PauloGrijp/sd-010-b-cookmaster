const express = require('express');
const usersController = require('../controllers/usersControllers');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersController.create);
// Não remover esse end-point, ele é necessário para o avaliador

app.use((err, _req, res, _next) => res.status(err.status).json({ message: err.message }));

module.exports = app;

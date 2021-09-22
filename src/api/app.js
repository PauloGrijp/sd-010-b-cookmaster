const express = require('express');

const app = express();

const userRoutes = require('../routes/userRoutes');
const recipeRotes = require('../routes/recipeRoutes');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(express.json());

app.use(userRoutes);
app.use(recipeRotes);

module.exports = app;

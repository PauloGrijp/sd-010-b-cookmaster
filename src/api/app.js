const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();

const route = require('../Routes');
const error = require('../middlewares/error');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

route.users(app);
route.recipes(app);

app.use(error);

module.exports = app;

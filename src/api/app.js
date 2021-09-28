const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const route = require('../routes');
const errors = require('../middlewares/errors');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

route.users(app);
route.recipes(app);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errors);

module.exports = app;
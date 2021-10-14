require('dotenv').config();
const path = require('path');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const express = require('express');
const { errorMiddleware } = require('../middlewares');
const routes = require('../routes');

const app = express();

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routes.users);
app.use('/login', routes.login);
app.use('/recipes', routes.recipes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorMiddleware);

module.exports = app;

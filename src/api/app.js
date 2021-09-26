const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const user = require('../controllers/user');
const recipes = require('../controllers/recipes');
const login = require('../controllers/login');
// const routes = require('./routes');

const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);
app.use('/users', user);
app.use('/recipes', recipes);
app.use('/login', login);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;

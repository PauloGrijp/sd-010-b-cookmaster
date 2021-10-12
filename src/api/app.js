const bodyParser = require('body-parser');
const express = require('express');
const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('./auth/validateJWT');
const validateJWTUpdate = require('./auth/validateJWTUpdate');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.create);

app.post('/login', usersController.login);

app.post('/recipes', validateJWT, recipesController.create);

app.get('/recipes', recipesController.getAll);

app.delete('/recipes/:id', validateJWTUpdate, recipesController.remove);

app.put('/recipes/:id', validateJWTUpdate, recipesController.update);

app.get('/recipes/:id', recipesController.getById);

module.exports = app;

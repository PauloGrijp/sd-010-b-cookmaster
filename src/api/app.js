const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const validateJWT = require('../middlewares/validateJWT');
const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.post('/users', usersController.registerNewUser);

app.post('/login', loginController.login);

app.post('/recipes', validateJWT.validateToken, recipesController.registerNewRecipe);

module.exports = app;

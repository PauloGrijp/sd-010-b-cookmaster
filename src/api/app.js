const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const users = require('../controllers/userController');
const login = require('../controllers/loginController');
const recipes = require('../controllers/recipesController');

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

const userValidate = require('../middlewares/userMiddlewares');
const validateEmailPassword = require('../middlewares/loginMiddlewares');
const recipesValidate = require('../middlewares/recipesMiddlewares');
const validateJWT = require('../middlewares/validateJWT');

app.use('/users', userValidate, users);
app.use('/login', validateEmailPassword, login);
app.use('/recipes', recipesValidate, validateJWT, recipes);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getPosts, createUsers, login, createRecipes } = require('./routes');
const { 
  userValidation, 
  validateEmail,
  userLogin, 
  validatePwd, 
  dataValidation, 
} = require('../services/index');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const apiRoutes = express.Router();

apiRoutes.get('/posts', getPosts)
          .post('/users', userValidation, validateEmail, createUsers)
          .post('/login', userLogin, validatePwd, login)
          .post('/recipes', dataValidation, validateJWT, createRecipes);

app.use(apiRoutes);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

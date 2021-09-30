const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const recipeRouter = require('../controllers/RecipeController');

const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');
const validateAdmin = require('../middlewares/validateAdmin');
const validationJWT = require('../middlewares/validationJWT');

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/recipes', recipeRouter);
app.post('/login', LoginController.findUser);
app.post('/users/admin', validationJWT, validateAdmin, UserController.createUser);
app.post('/users', UserController.createUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;

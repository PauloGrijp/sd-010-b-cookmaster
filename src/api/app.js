const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const UserMiddleweres = require('../middlewares/userMiddleweres/index');
const { validateRecipe, validateToken } = require('../middlewares/recipesMiddleweres/index');
const users = require('../controller/users');
const recipes = require('../controller/recipes');

const app = express();
// app.use(
//   cors({
//     origin: `http://localhost:${3000}`,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Authorization'],
//   }),
// );

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UserMiddleweres.validateUser, users.createUser);
app.post('/login', UserMiddleweres.validateLogin, users.loginUser);
app.post('/recipes', validateRecipe, validateToken, recipes.createRecipes);

module.exports = app;

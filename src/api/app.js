const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const app = express();
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', controllers.createUser);

app.post('/login', authentication.login, controllers.login);

app.post('/recipes', authorization.verifyToken, controllers.createRecipe);

app.get('/recipes', controllers.getRecipes);

app.get('/recipes/:id', controllers.getRecipeById);

app.put('/recipes/:id', authorization.verifyToken, controllers.editRecipe);

app.delete('/recipes/:id', authorization.verifyToken, controllers.deleteRecipe);

module.exports = app;

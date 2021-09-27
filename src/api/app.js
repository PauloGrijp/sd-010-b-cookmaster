const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const Users = require('./controllers/Users');
const Recipes = require('./controllers/Recipes');

const upload = require('./middlewares/multer');
const errorMiddleware = require('./middlewares/error');

const validateJWTPost = require('./middlewares/validateJWTPost');
const validateJWTPutDelete = require('./middlewares/validateJWTPutDelete');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', Users.registerNewUser);
app.post('/login', Users.loginUser);

app.get('/recipes', Recipes.getAllRecipes);
app.get('/recipes/:id', Recipes.getRecipeById);

app.post('/recipes', validateJWTPost, Recipes.registerNewRecipe);

app.put('/recipes/:id/image/',
  validateJWTPutDelete, Recipes.addImageRecipeById, upload.single('image'), Recipes.getRecipeById);
app.put('/recipes/:id', validateJWTPutDelete, Recipes.editRecipeById);

app.delete('/recipes/:id', validateJWTPutDelete, Recipes.deleteRecipeById);

app.use(errorMiddleware);

module.exports = app;

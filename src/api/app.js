const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { isValidUser } = require('../middlewares/userMiddleware');
const { createUser } = require('../models/userModel');
const { isValidLogin } = require('../middlewares/loginMiddleware');
const { login } = require('../controllers/userController');
const { 
  listAllRecipes,
  recipeCreate,
  findRecipeId,
  recipeUpdate,
  addImage,
  recipeDelete,
  notImg } = require('../controllers/recipesController');
const { existsRecipe, isValidRecipe } = require('../middlewares/recipeMiddleware');
const validateJWT = require('./auth/validateJWT');

const app = express();

const storage = multer.diskStorage({
  destination: (request, file, callback) => callback(null, path
    .resolve(__dirname, '..', 'uploads')),
  filename: (request, file, callback) => callback(null, `${request.params.id}.jpeg`),
});

const upload = multer({ storage });

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images', express.static(path.resolve(__dirname, '..', 'uploads')));
app.post('/users', isValidUser, createUser);
app.post('/login', isValidLogin, login);

app.get('/recipes', listAllRecipes);
app.get('/recipes/:id', existsRecipe, findRecipeId);
app.put('/recipes/:id', validateJWT, isValidRecipe, existsRecipe, recipeUpdate);
app.put('/recipes/:id/image', validateJWT, upload.single('image'), addImage, notImg);
app.post('/recipes', validateJWT, isValidRecipe, recipeCreate);
app.post('/recipes', validateJWT, isValidRecipe, recipeCreate);
app.delete('/recipes/:id', validateJWT, recipeDelete);

module.exports = app;

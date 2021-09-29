const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const validateJWT = require('./auth/validateJWT');
const UsersController = require('../controllers/UsersController');
const LoginController = require('../controllers/LoginController');
const RecipeController = require('../controllers/RecipeController');
const RecipeModel = require('../models/RecipesModel');

const app = express();
app.use(bodyParser.json());

const URL = 'localhost:3000/src/uploads/';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage }).single('image');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UsersController.createUser);
app.post('/login', LoginController.loginUser);
app.post('/recipes', validateJWT, RecipeController.createRecipe);
app.get('/recipes', RecipeController.getRecipes);
app.get('/recipes/:id', RecipeController.findById);
app.put('/recipes/:id', validateJWT, RecipeController.updateRecipes);
app.delete('/recipes/:id', validateJWT, RecipeController.excludeRecipe);

app.put('/recipes/:id/image', validateJWT, upload, async (req, res) => {
  const { filename } = req.file;
  const { id } = req.params;

  const recipe = await RecipeModel.updateImage(id, URL, filename);
  return res.status(200).json(recipe);
});

module.exports = app;

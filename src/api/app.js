const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const validateJWT = require('./auth/validateJWT');
const UsersController = require('../controllers/UsersController');
const LoginController = require('../controllers/LoginController');
const RecipesController = require('../controllers/RecipesController');
const RecipesModel = require('../models/RecipesModel');

const app = express();
app.use(bodyParser.json());

const URL = 'localhost:3000/src/uploads/';

const storage = multer.diskStorage({
  distination: (req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UsersController.createUser);

app.post('/login', LoginController.loginUser);

app.post('/recipes', validateJWT, RecipesController.createRecipe);
app.get('/recipes', RecipesController.recipesList);
app.get('/recipes/:id', RecipesController.findRecipeById);
app.put('/recipes/:id', validateJWT, RecipesController.updateRecipe);
app.delete('/recipes/:id', validateJWT, RecipesController.excludeRecipe);

app.put('/recipes/:id/image', validateJWT, upload.single('image'), async (req, res) => {
  const { filename } = req.file;
  const { id } = req.params;

  await RecipesModel.updateImage(id, URL, filename);

  const newRecipe = await RecipesModel.findById(id); 
  
  res.status(200).json(newRecipe);
});

module.exports = app;

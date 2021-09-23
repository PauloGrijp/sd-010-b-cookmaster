const express = require('express');
const multer = require('multer');

const app = express();
const bodyParser = require('body-parser');

const userController = require('../../controllers/userController');
const recipeController = require('../../controllers/recipeController');
const validateJWT = require('../../middlewares/validateJWT');

app.use(bodyParser.json());

const { storage } = require('../../controllers/recipeController');

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.createUser);

app.post('/login', userController.loginUser);

app.post('/recipes', validateJWT, recipeController.createRecipe);

app.get('/recipes', recipeController.getAllRecipes);

app.get('/recipes/:id', recipeController.getRecipeById);

app.put('/recipes/:id/image', validateJWT, upload.single('image'),
  recipeController.updateRecipeImage);

app.put('/recipes/:id', validateJWT, recipeController.updateRecipe);

app.delete('/recipes/:id', validateJWT, recipeController.excludeRecipe);

module.exports = app;

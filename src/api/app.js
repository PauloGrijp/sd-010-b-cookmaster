const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { validateToken } = require('../middlewares/validateJWT');
const { upload } = require('../middlewares/multer');
const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.post('/users', usersController.registerNewUser);

app.post('/login', loginController.login);

app.post('/recipes', validateToken, recipesController.registerNewRecipe);

app.get('/recipes', recipesController.getAllRecipes);

app.get('/recipes/:id', recipesController.getRecipeById);

app.put('/recipes/:id', validateToken, recipesController.updateRecipeById);

app.delete('/recipes/:id', validateToken, recipesController.deleteRecipeById);

app.put('/recipes/:id/image', validateToken, upload.single('image'), recipesController.addImage);

module.exports = app;

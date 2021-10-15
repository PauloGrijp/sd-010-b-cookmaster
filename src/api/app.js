const express = require('express');
const path = require('path');
const { login } = require('../controllers/login');
const { registerUser } = require('../controllers/usersController');
const { auth } = require('../middlewares/auth');
const { newRecipe, getAllRecipes, getRecipe, 
  editRecipe, deleteRecipe, insertRecipeImage } = require('../controllers/recipesController');
const { uploadWithMulter } = require('../middlewares/multerSetup');

const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', registerUser);

app.post('/login', login);

app.route('/recipes/:id/image/')
.put(auth, uploadWithMulter.single('image'), insertRecipeImage);

app.route('/recipes/:id')
.get(getRecipe)
.put(auth, editRecipe)
.delete(auth, deleteRecipe);

app.route('/recipes')
  .get(getAllRecipes)
  .post(auth, newRecipe);

module.exports = app;

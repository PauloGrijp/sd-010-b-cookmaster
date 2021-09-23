const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('../controllers/usersControllers');
const RecipesController = require('../controllers/recipesControllers');
const { verifyToken } = require('../middlewares/verifyToken');
const { callMulter } = require('../middlewares/multer');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});
// IMAGES
app.use('/images', express.static('src/uploads/'));

// USERS
app.post('/users', UsersController.registerUsers);
app.post('/login', UsersController.loginUser);
// ADMINS
app.post('/users/admin', verifyToken, UsersController.registerAdmin);

// RECEITAS
app.put('/recipes/:id/image', verifyToken, 
callMulter().single('image'),
RecipesController.addImage);
app.get('/recipes/:id', RecipesController.getOneRecipes);
app.put('/recipes/:id', verifyToken, RecipesController.updateRecipes);
app.delete('/recipes/:id', verifyToken, RecipesController.deleteRecipes);
app.get('/recipes', RecipesController.getAllRecipes);
app.post('/recipes', verifyToken, RecipesController.registerRecipes);

module.exports = app;

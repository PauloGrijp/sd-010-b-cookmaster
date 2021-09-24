const { Router } = require('express');
const { validToken, validRecipe } = require('../middlewares/recipeMiddlewares');
const { createRecipe, allRecipes,
  getById, deleteRecipe, editRecipe, uploadImage } = require('../controllers/recipeController');
const { loggedUser } = require('../middlewares/userMiddlewares');

const routes = new Router();

// routes.get('/', (_request, response) => {
//   response.send();
// });

routes.post('/recipes', validToken, validRecipe, createRecipe);
routes.get('/recipes', allRecipes);
routes.get('/recipes/:id', getById);
routes.put('/recipes/:id', validToken, loggedUser, editRecipe);
routes.delete('/recipes/:id', validToken, loggedUser, deleteRecipe);
routes.put('/recipes/:id/image/', validToken, loggedUser, uploadImage);

module.exports = routes;
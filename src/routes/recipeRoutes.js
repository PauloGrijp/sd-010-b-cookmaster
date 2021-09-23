const { Router } = require('express');
const { validToken, validRecipe } = require('../middlewares/recipeMiddlewares');
const { createRecipe, allRecipes, getById } = require('../controllers/recipeController');

const routes = new Router();

// routes.get('/', (_request, response) => {
//   response.send();
// });

routes.post('/recipes', validToken, validRecipe, createRecipe);
routes.get('/recipes', allRecipes);
routes.get('/recipes/:id', getById);

module.exports = routes;
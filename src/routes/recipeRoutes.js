const { Router } = require('express');
const { validToken, validRecipe } = require('../middlewares/recipeMiddlewares');
const { createRecipe, allRecipes } = require('../controllers/recipeController');

const routes = new Router();

// routes.get('/', (_request, response) => {
//   response.send();
// });

routes.post('/recipes', validToken, validRecipe, createRecipe);
routes.get('/recipes', allRecipes);

module.exports = routes;
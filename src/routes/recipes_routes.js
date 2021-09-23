const { Router } = require('express');
const { createRecipe, getAllRecipes } = require('../controllers/recipes_controller');
const { TokenValidation, RecipeValidation } = require('../middlewares/recipes.middlewares');

const routes = new Router();

routes.post('/recipes', TokenValidation, RecipeValidation, createRecipe);
routes.get('/recipes', getAllRecipes);

module.exports = routes;

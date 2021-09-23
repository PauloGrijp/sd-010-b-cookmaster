const { Router } = require('express');
const { createRecipe, getAllRecipes, recipeById } = require('../controllers/recipes_controller');
const { TokenValidation, RecipeValidation, IdValidation,
} = require('../middlewares/recipes.middlewares');

const routes = new Router();

routes.get('/recipes', getAllRecipes);
routes.get('/recipes/:id', IdValidation, recipeById);
routes.post('/recipes', TokenValidation, RecipeValidation, createRecipe);

module.exports = routes;

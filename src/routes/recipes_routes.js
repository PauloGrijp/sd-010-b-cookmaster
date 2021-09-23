const { Router } = require('express');
const { createRecipe } = require('../controllers/recipes_controller');
const { TokenValidation, RecipeValidation } = require('../middlewares/recipes.middlewares');

const routes = new Router();

routes.post('/recipes', TokenValidation, RecipeValidation, createRecipe);

module.exports = routes;

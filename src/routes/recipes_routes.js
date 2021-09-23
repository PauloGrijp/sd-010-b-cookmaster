const { Router } = require('express');
const { createRecipe, getAllRecipes, recipeById, updateRecipe,
} = require('../controllers/recipes_controller');
const { TokenValidation, RecipeValidation, IdValidation, RoleValidation,
} = require('../middlewares/recipes.middlewares');

const routes = new Router();

routes.get('/recipes', getAllRecipes);
routes.get('/recipes/:id', IdValidation, recipeById);
routes.post('/recipes', TokenValidation, RecipeValidation, createRecipe);
routes.put('/recipes/:id', TokenValidation, RoleValidation, updateRecipe);

module.exports = routes;

const { Router } = require('express');

const { createRecipe, getAllRecipes, recipeById, updateRecipe, removeRecipe,
} = require('../controllers/recipes_controller');

const { TokenValidation, RecipeValidation, IdValidation, RoleValidation,
} = require('../middlewares/recipes.middlewares');

const routes = new Router();

routes.get('/recipes', getAllRecipes);
routes.get('/recipes/:id', IdValidation, recipeById);
routes.post('/recipes', TokenValidation, RecipeValidation, createRecipe);
routes.put('/recipes/:id', TokenValidation, RoleValidation, updateRecipe);
routes.delete('/recipes/:id', TokenValidation, RoleValidation, removeRecipe);

module.exports = routes;

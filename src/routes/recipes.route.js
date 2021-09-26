const recipesRoute = require('express').Router();
const rescue = require('express-rescue');

const { validateToken } = require('../middlewares/validateToken');

const RecipesController = require('../controllers/recipes.controller');

recipesRoute.post('/', rescue(validateToken), rescue(RecipesController.createRecipe));
recipesRoute.get('/', rescue(RecipesController.getAllRecipes));
recipesRoute.get('/:id', rescue(RecipesController.getRecipeById));
recipesRoute.put('/:id', rescue(validateToken), rescue(RecipesController.updateRecipe));

module.exports = recipesRoute;
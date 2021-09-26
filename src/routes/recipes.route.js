const recipesRoute = require('express').Router();
const rescue = require('express-rescue');

const { validateToken } = require('../middlewares/validateToken');

const RecipesController = require('../controllers/recipes.controller');

recipesRoute.post('/', rescue(validateToken), rescue(RecipesController.createRecipe));

module.exports = recipesRoute;
const express = require('express');

const JWTValidation = require('../middlewares/JWTValidation');
const recipesController = require('../controllers/recipesController');

const route = express.Router();

route
  .post('/', JWTValidation, recipesController.createRecipe)
  .get('/', recipesController.getAllRecipes)
  .get('/:id', recipesController.getRecipeById)
  .put('/:id', JWTValidation, recipesController.updateRecipe)
  .delete('/:id', JWTValidation, recipesController.deleteRecipe);

module.exports = route;
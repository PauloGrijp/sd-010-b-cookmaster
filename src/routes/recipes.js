const express = require('express');

const {
  create,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} = require('../controllers/recipes');

const route = express.Router();
route.get('/:id', getRecipeById);
route.put('/:id', updateRecipe);
route.get('/', getAllRecipes);
route.post('/', create);

module.exports = route;
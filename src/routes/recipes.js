const express = require('express');

const {
  create,
  getAllRecipes,
  getRecipeById,
} = require('../controllers/recipes');

const route = express.Router();
route.post('/', create);
route.get('/', getAllRecipes);
route.get('/:id', getRecipeById);

module.exports = route;
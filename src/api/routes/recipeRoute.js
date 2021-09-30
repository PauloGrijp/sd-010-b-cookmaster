const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/recipeController');

const route = express.Router();

route.get('/', rescue(controller.getAllRecipes));
route.get('/:id', rescue(controller.getRecipe));
route.post('/', rescue(controller.createRecipe));
route.put('/:id', rescue(controller.updateRecipe));
route.delete('/:id', rescue(controller.removeRecipe));

module.exports = route;
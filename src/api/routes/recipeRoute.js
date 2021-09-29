const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/recipeController');

const route = express.Router();

route.post('/', rescue(controller.createRecipe));

module.exports = route;
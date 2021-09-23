const express = require('express');

const {
  create,
  getAllRecipes,
} = require('../controllers/recipes');

const route = express.Router();
route.post('/', create);
route.get('/', getAllRecipes);

module.exports = route;
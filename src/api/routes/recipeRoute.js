const express = require('express');
const { validateRecipeInsertion, authenticateMiddleware } = require('../middlewares');

const recipeRoute = (controller) => {
  const route = express.Router();
  route.post('/', authenticateMiddleware, validateRecipeInsertion, controller.insertData);

  return route;
};

module.exports = recipeRoute;

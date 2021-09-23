const express = require('express');
const { validateRecipeInsertion, authenticateMiddleware } = require('../middlewares');

const recipeRoute = (controller) => {
  const route = express.Router();
  route.get('/', controller.getAll);
  route.get('/:id', controller.findById);

  route.use(authenticateMiddleware);
  route.post('/', validateRecipeInsertion, controller.insertData);

  return route;
};

module.exports = recipeRoute;

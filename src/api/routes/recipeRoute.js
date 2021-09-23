const express = require('express');
const { validateRecipeInsertion, authenticateMiddleware } = require('../middlewares');

const recipeRoute = (controller) => {
  const route = express.Router();
  route.get('/', controller.getAll);
  route.get('/:id', controller.findById);

  route.use(authenticateMiddleware);
  route.use(validateRecipeInsertion);
  
  route.post('/', controller.insertData);
  route.put('/:id', controller.updateData);

  return route;
};

module.exports = recipeRoute;

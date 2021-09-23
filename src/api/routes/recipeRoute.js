const express = require('express');

const recipeRoute = (controller) => {
  const route = express.Router();
  route.post('/', controller.insertData);

  return route;
};

module.exports = recipeRoute;

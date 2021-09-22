const rescue = require('express-rescue');
const controller = require('../Controllers/Recipes');
const utils = require('../utils/token');

const recipes = (app) => {
  app.route('/recipes')
    .get(rescue(controller.getAll))
    .post(rescue(utils.validateToken), rescue(controller.newRecipe));
  app.route('/recipes/:id')
    .get(rescue(controller.getById));
};

module.exports = recipes;
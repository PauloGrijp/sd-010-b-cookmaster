const rescue = require('express-rescue');
const controller = require('../Controllers/Recipes');
const token = require('../utils/token');

const recipes = (app) => {
  app.route('/recipes')
    .post(rescue(token.validateToken), rescue(controller.newRecipe));
};

module.exports = recipes;
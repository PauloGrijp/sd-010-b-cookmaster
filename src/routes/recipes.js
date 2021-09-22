const rescue = require('express-rescue');
const controller = require('../controllers/recipes');
const { tokenValidation } = require('../middlewares/token');

function recipes(app) {
  app.route('/recipes')
    .get(rescue(controller.fetchRecipes))
    .post(rescue(tokenValidation), rescue(controller.newRecipe));
  app.route('/recipes/:id')
    .get(rescue(controller.getById))
    .put(rescue(tokenValidation), rescue(controller.editRecipe))
    .delete(rescue(tokenValidation), rescue(controller.deleteRecipe));
}

module.exports = recipes;

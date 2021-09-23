const rescue = require('express-rescue');
const controller = require('../Controllers/Recipes');
const uploadFile = require('../middlewares/uploadFile');
const utils = require('../utils/token');

const recipes = (app) => {
  app.route('/recipes')
    .get(rescue(controller.getAll))
    .post(rescue(utils.validateToken), rescue(controller.newRecipe));

  app.route('/recipes/:id')
    .get(rescue(controller.getById))
    .put(rescue(utils.validateToken), rescue(controller.updateRecipe))
    .delete(rescue(utils.validateToken), rescue(controller.deleteRecipe));
    
  app.route('/recipes/:id/image')
    .put(rescue(utils.validateToken), rescue(uploadFile), controller.addRecipeUrlImage);
};

module.exports = recipes;
const rescue = require('express-rescue');
const controller = require('../controllers/recipes');
const { tokenValidation } = require('../middlewares/token');
const upload = require('../middlewares/multer');

function recipes(app) {
  app.route('/recipes/:id/image')
    .put(rescue(tokenValidation), rescue(upload.single('image')), rescue(controller.addImg));
  app.route('/recipes/:id')
    .get(rescue(controller.getById))
    .put(rescue(tokenValidation), rescue(controller.editRecipe))
    .delete(rescue(tokenValidation), rescue(controller.deleteRecipe));
  app.route('/recipes')
    .get(rescue(controller.fetchRecipes))
    .post(rescue(tokenValidation), rescue(controller.newRecipe));
}

module.exports = recipes;

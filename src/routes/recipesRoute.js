const rescue = require('express-rescue');
const { getAllRecipesC, getRecipeIdC, createRecipeC, updateRecipeC,
  uploadImgRecipeC, deleteRecipeC } = require('../controllers/recipesController');
const { validTokenUser } = require('../middlewares/tokenMiddlewares');
const fileMiddleware = require('../middlewares/fileMiddlewares');

const recipes = (app) => {
  app.route('/recipes').get(rescue(getAllRecipesC))
    .post(rescue(validTokenUser), rescue(createRecipeC));
  app.route('/recipes/:id')
    .get(rescue(getRecipeIdC))
    .put(rescue(validTokenUser), rescue(updateRecipeC))
    .delete(rescue(validTokenUser), rescue(deleteRecipeC));
  app.route('/recipes/:id/image')
    .put(rescue(validTokenUser), rescue(fileMiddleware), uploadImgRecipeC);
};

module.exports = recipes;

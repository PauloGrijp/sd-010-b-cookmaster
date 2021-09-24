const rescue = require('express-rescue');
const { createRecipesC, getAllRecipesC, getIdRecipesC,
  updateRecipesC, deleteRecipesC } = require('../controllers/recipesController');
const { validTokenUser } = require('../middlewares/auth');

const recipes = (app) => {
  app.route('/recipes')
    .get(rescue(getAllRecipesC))
    .post(rescue(validTokenUser), rescue(createRecipesC));
  app.route('/recipes/:id')
    .get(rescue(getIdRecipesC))
    .put(rescue(validTokenUser), rescue(updateRecipesC))
    .delete(rescue(validTokenUser), rescue(deleteRecipesC));
};

module.exports = recipes; 
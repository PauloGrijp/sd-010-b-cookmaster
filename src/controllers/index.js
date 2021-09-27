const { postUsersController, login } = require('./users');
const {
   postRecipeController, getRecipesController, getRecipeByIdController } = require('./recipes');

module.exports = {
  postUsersController,
  login,
  getRecipesController,
  postRecipeController,
  getRecipeByIdController };

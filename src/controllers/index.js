const { postUsersController, login } = require('./users');
const {
   postRecipeController,
   getRecipesController,
   getRecipeByIdController,
   putRecipeByIdController } = require('./recipes');

module.exports = {
  postUsersController,
  login,
  getRecipesController,
  postRecipeController,
  getRecipeByIdController,
  putRecipeByIdController };

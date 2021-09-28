const { postUsersController, login } = require('./users');
const {
   postRecipeController,
   getRecipesController,
   getRecipeByIdController,
   putRecipeByIdController,
   deleteRecipeByIdController,
   putImageController } = require('./recipes');

module.exports = {
  postUsersController,
  login,
  getRecipesController,
  postRecipeController,
  getRecipeByIdController,
  putRecipeByIdController,
  deleteRecipeByIdController,
  putImageController };

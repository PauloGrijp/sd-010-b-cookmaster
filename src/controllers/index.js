const { postUsersController, login } = require('./users');
const { postRecipeController, getRecipesController } = require('./recipes');

module.exports = { postUsersController, login, getRecipesController, postRecipeController };

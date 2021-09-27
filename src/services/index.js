const { postUsersService, checkEmailPassword } = require('./users');
const { postRecipeService,
  getRecipesService,
  getRecipeByIdService,
  putRecipeByIdService } = require('./recipes');

module.exports = {
  postUsersService,
  checkEmailPassword,
  postRecipeService,
  getRecipesService,
  getRecipeByIdService,
  putRecipeByIdService };

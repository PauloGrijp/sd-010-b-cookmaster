const authLogin = require('./loginMiddleware');
const authRecipe = require('./recipeMiddleware');
const authJWT = require('./validateJWT');
const authUser = require('./userMiddleware');

module.exports = {
  authLogin,
  authJWT,
  authUser,
  authRecipe,
};

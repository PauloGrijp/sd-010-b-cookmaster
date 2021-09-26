const authLogin = require('./loginMiddleware');
const authRecipe = require('./recipeMiddleware');
const authJWT = require('./validateJWT');
const authUser = require('./userMiddleware');
const upload = require('./uploadImage');

module.exports = {
  authLogin,
  authJWT,
  authUser,
  authRecipe,
  upload,
};

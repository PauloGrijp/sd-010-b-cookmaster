const { userValidation, validateEmail } = require('./userValidation');
const { userLogin, validatePwd } = require('./loginValidation');
const { dataValidation } = require('./recipesValidation');
const isValidRecipe = require('./recipeValidation');

module.exports = { 
  userValidation, 
  validateEmail,
  userLogin, 
  validatePwd, 
  dataValidation,
  isValidRecipe,
};
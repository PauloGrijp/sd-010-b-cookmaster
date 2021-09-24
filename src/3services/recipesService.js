const { createRecipeModel, getRecipesModel } = require('../4models/recipeModel');
const { verifyToken } = require('../5middleware/logintoken');

const error = {
  invalid: { status: 400, message: 'Invalid entries. Try again.' },
  invalidToken: { status: 401, message: 'jwt malformed' },
};

const createRecipeService = async (recipe, token) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) { return error.invalid; }
  const answer = await verifyToken(token);
  if (answer === 'error') { return error.invalidToken; }
  const { _id } = answer;
  return createRecipeModel(recipe, _id);
};

const getRecipesService = async () => getRecipesModel();

module.exports = {
  createRecipeService,
  getRecipesService,
};
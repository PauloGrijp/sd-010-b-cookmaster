const RecipeModel = require('../models/RecipeModel');
const { validateId } = require('../middlewares/validations');

const NOT_FOUND = 404;

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const response = await RecipeModel.createRecipe({ name, ingredients, preparation, userId });
  return response;
};

const getAllRecipes = async () => RecipeModel.getAllRecipes();

const findRecipe = async ({ id }) => {
  const isIdValid = validateId(id);
  if (!isIdValid) return NOT_FOUND;
  const response = await RecipeModel.findRecipe({ id });
  return response;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipe,
};

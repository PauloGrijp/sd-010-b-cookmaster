const RecipeModel = require('../models/RecipeModel');
const { validateId } = require('../middlewares/validations');

const NOT_FOUND = 404;
const RECIPE_NOT_FOUND = { message: 'recipe not found' };

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

const updateRecipe = async ({ id, name, ingredients, preparation, userId }) => {
  const response = await RecipeModel.updateRecipe({ id, name, ingredients, preparation, userId });
  return response;
};

const deleteRecipe = async ({ id }) => {
  if (!id) return RECIPE_NOT_FOUND;
  return RecipeModel.deleteRecipe(id);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipe,
  updateRecipe,
  deleteRecipe,
};

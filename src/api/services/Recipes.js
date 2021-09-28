const { checkEmptyInputs, checkId } = require('../validations/Recipes');
const Recipes = require('../models/Recipes');

const errors = {
  notFound: 'recipe not found',
};

const createRecipe = async (recipe, userId) => {
  const haveEmptyInputs = checkEmptyInputs(recipe);
  if (haveEmptyInputs.message) return haveEmptyInputs;

  return Recipes.createRecipe(recipe, userId);
};

const getAllRecipes = async () => Recipes.getAllRecipes();

const getRecipeById = async (id) => {
  const isValidId = await checkId(id);
  if (!isValidId) return { message: errors.notFound };

  const recipe = await Recipes.getRecipeById(id);
  if (!recipe) return { message: errors.notFound };

  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};

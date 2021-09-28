const { checkEmptyInputs, checkId } = require('../validations/Recipes');
const Recipes = require('../models/Recipes');

const errors = {
  notFound: 'recipe not found',
  accessDenied: 'access denied',
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

const updateRecipe = async (recipeToBeUpdated, id, user) => {
  const recipe = await Recipes.updateRecipe(recipeToBeUpdated, id, user);
  if (recipe.accessError) return { message: errors.accessDenied };

  return recipe;
};

const deleteRecipe = async (id, user) => {
  const deletedRecipe = await Recipes.deleteRecipe(id, user);
  if (deletedRecipe.accessError) return { message: errors.accessDenied };

  return {};
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};

const { checkEmptyInputs } = require('../validations/Recipes');
const Recipes = require('../models/Recipes');

const createRecipe = async (recipe, userId) => {
  const haveEmptyInputs = checkEmptyInputs(recipe);
  if (haveEmptyInputs.message) return haveEmptyInputs;

  return Recipes.createRecipe(recipe, userId);
};

const getAllRecipes = async () => Recipes.getAllRecipes();

module.exports = {
  createRecipe,
  getAllRecipes,
};

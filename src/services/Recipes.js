const Recipe = require('../models/Recipes');
const { NOT_FOUND } = require('../utils/statusCodes');

const createRecipe = async (data) => {
  const recipe = await Recipe.createRecipe(data);

  return recipe;
};

const getRecipeById = async (id) => {
  const recipe = await Recipe.getRecipeById(id);

  if (!recipe) return { code: NOT_FOUND, message: 'recipe not found' };

  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes: Recipe.getAllRecipes,
  getRecipeById,
};
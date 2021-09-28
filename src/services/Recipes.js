const Recipe = require('../models/Recipes');
const { NOT_FOUND, UNAUTHORIZED } = require('../utils/statusCodes');

const getRecipeById = async (id) => {
  const recipe = await Recipe.getRecipeById(id);

  if (!recipe) return { code: NOT_FOUND, message: 'recipe not found' };

  return recipe;
};

const updateRecipe = async ({ id, data, user }) => {
  const { _id, role } = user;
  const recipeExists = await getRecipeById(id);

  if (_id !== recipeExists.userId && role !== 'admin') {
    return { code: UNAUTHORIZED, message: 'missing auth token' };
  }

  const recipe = await Recipe.updateRecipe({ id, data });

  return recipe;
};

const deleteRecipe = async ({ id, recipe, user }) => {
  const { _id, role } = user;
  
  if (_id !== recipe.userId || role !== 'admin') {
    return { code: UNAUTHORIZED, message: 'missing auth token' };
  }
  
  const deletedRecipe = await Recipe.deleteRecipe({ id });

  return deletedRecipe;
};

module.exports = {
  createRecipe: Recipe.createRecipe,
  getAllRecipes: Recipe.getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage: Recipe.uploadImage,
};
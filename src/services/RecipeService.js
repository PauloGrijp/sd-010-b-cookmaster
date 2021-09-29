const RecipeModel = require('../models/RecipeModel');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const response = await RecipeModel.createRecipe({ name, ingredients, preparation, userId });
  return response;
};

const getAllRecipes = async () => RecipeModel.getAllRecipes();

module.exports = {
  createRecipe,
  getAllRecipes,
};

const { recipeModel } = require('../models');

const createRecipe = async (recipeInfo, userId) => (recipeModel.create(recipeInfo, userId));

const getAllRecipes = async () => recipeModel.getAllRecipes();

module.exports = {
  createRecipe,
  getAllRecipes,
};
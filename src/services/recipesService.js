const recipesModel = require('../models/recipesModel');

const createRecipe = async (recipeData) => {
  const createdRecipe = await recipesModel.createRecipe(recipeData);
  return createdRecipe;
};

const getAll = async () => {
  const allRecipes = await recipesModel.getAll();
  return allRecipes;
};

module.exports = {
  createRecipe,
  getAll,
};
const recipesModel = require('../models/recipesModel');

const createRecipe = async (recipeData) => {
  const createdRecipe = await recipesModel.createRecipe(recipeData);
  return createdRecipe;
};

module.exports = {
  createRecipe,
};
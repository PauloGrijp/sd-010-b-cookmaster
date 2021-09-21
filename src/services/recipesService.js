const recipesModel = require('../models/recipesModel');

const createRecipe = async (recipeData) => {
  const createdRecipe = await recipesModel.createrecipe(recipeData);
  return createdRecipe;
};

module.exports = {
  createRecipe,
};
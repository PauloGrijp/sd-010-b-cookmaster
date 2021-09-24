const model = require('../models/recipesModel');

const createRecipe = async (recipe, id) => {
  const newRecipe = await model.createRecipe(recipe, id);
  return newRecipe;
};

const getAllRecipes = async () => {
  const allRecipes = await model.getAllRecipes();
  return allRecipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};

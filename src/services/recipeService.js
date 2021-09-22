const { addNewRecipeModel, getRecipes } = require('../models/recipeModel');

const addNewRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await addNewRecipeModel(name, ingredients, preparation, userId);
  return recipe;
};

const getRecipe = async () => {
  const recipe = await getRecipes();
  return recipe;
};

module.exports = { addNewRecipe, getRecipe };
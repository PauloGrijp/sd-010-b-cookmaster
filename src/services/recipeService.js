const { addNewRecipeModel } = require('../models/recipeModel');

const addNewRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await addNewRecipeModel(name, ingredients, preparation, userId);
  return recipe;
};

module.exports = { addNewRecipe };
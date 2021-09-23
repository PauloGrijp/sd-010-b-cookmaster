const recipesModel = require('../models/recipesModel');

const addRecipe = async (recipeData) => {
  const recipe = await recipesModel.addRecipe(recipeData);

  if (!recipe) return {};

  return { recipe };
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  
  if (!recipes) return {};

  return recipes;
};

module.exports = { addRecipe, getAllRecipes };

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

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);
  
  if (!recipe) return null;
  
  return recipe;
};

module.exports = { addRecipe, getAllRecipes, getRecipeById };

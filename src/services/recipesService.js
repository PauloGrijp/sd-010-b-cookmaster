const recipesModel = require('../models/recipesModel');

const createRecipe = async (recipeData) => {
  const createdRecipe = await recipesModel.createRecipe(recipeData);
  return createdRecipe;
};

const getAll = async () => {
  const allRecipes = await recipesModel.getAll();
  return allRecipes;
};

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
};
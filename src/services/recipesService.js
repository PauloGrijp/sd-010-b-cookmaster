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

const updateRecipe = async ({ recipeId, name, ingredients, preparation, id, role }) => {
  const recipeToVerifyOwner = await recipesModel.getById(recipeId);
    const { userId } = recipeToVerifyOwner;
    if (id !== userId && role !== 'admin') {
      return null;
    }
    const recipe = await recipesModel.updateRecipe(recipeId, name, ingredients, preparation);
    return recipe;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
};
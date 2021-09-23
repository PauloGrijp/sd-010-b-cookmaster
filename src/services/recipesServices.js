const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');

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

const updateRecipe = async (email, id, recipe) => {
  const user = await usersModel.findUser(email);

  if (user.email !== email && user.role !== 'admin') return null;

  const updatedRecipe = await recipesModel.updateRecipe(id, recipe);
  
  if (!updatedRecipe) return null;
  
  return updatedRecipe;
};

module.exports = { addRecipe, getAllRecipes, getRecipeById, updateRecipe };

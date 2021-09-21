const {
  createRecipeData,
  getAllRecipesData,
  getRecipeData,
  updateRec,
  removeRecipeData,
  setPicFile,
} = require('../models/recipeModel');
const { ApiError } = require('../utils/ApiError');
const {
  checkRecipe,
  validateId,
  checkIfRecipeExists,
} = require('./validations');

const createRecipe = async (body) => {
  await checkRecipe(body);
  const recipe = await createRecipeData(body);
  return recipe;
};

const getAllRecipes = async () => {
  const allRecipes = await getAllRecipesData();
  return allRecipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,

};

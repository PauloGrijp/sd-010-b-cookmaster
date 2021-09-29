const recipesModel = require('../models/recipesModel');

const recipesError = { message: 'Invalid entries. Try again.' };

const validateNewRecipe = async ({ name, ingredients, preparation }) => {
  if (!name) return recipesError;
  if (typeof ingredients !== 'string') return recipesError;
  if (!preparation) return recipesError;

  return 'SUCCESS';
};

const getRecipeById = async (id) => {
  const existsRecipe = await recipesModel.getRecipeById(id);

  if (!existsRecipe) {
    recipesError.message = 'recipe not found';
    return recipesError;
  }

  return existsRecipe;
};

const createRecipe = async ({ recipe, verifiedToken }) => {
  const validationResult = await validateNewRecipe(recipe);
  if (validationResult !== 'SUCCESS') return validationResult;

  const { _id } = verifiedToken;
  const createdUser = await recipesModel.createRecipe(recipe, _id);
  return createdUser;
};

const getAllRecipes = async () => {
  const recipesList = await recipesModel.getAllRecipes();

  return recipesList;
};

module.exports = { createRecipe, getAllRecipes, getRecipeById };

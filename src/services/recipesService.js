const recipesModel = require('../models/recipesModel');
const { validEntries } = require('../validations/recipesValidation');

const error = (code, message) => ({ err: { code, message } });

const codes = {
  badRequest: 400,
  notFound: 404,
};

const { badRequest, notFound } = codes;

const messages = {
  invalidEntries: 'Invalid entries. Try again.',
  recipeNF: 'recipe not found',
};

const { invalidEntries, recipeNF } = messages;

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!validEntries(name, ingredients, preparation)) {
    return Promise.reject(error(badRequest, invalidEntries));
  }
  return recipesModel.createRecipe(name, ingredients, preparation, userId);
};

const getAllRecipes = async () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => {
  if (id.length !== 24) return Promise.reject(error(notFound, recipeNF));
  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) return Promise.reject(error(notFound, recipeNF));
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};

const recipesModel = require('../models/recipesModel');
const { validEntries } = require('../validations/recipesValidation');

const error = (code, message) => ({ err: { code, message } });

const codes = {
  badRequest: 400,
};

const { badRequest } = codes;

const messages = {
  invalidEntries: 'Invalid entries. Try again.',
};

const { invalidEntries } = messages;

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!validEntries(name, ingredients, preparation)) {
    return Promise.reject(error(badRequest, invalidEntries));
  }
  return recipesModel.createRecipe(name, ingredients, preparation, userId);
};

const getAllRecipes = async () => recipesModel.getAllRecipes();

module.exports = {
  createRecipe,
  getAllRecipes,
};

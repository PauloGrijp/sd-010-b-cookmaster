const recipesModel = require('../models/recipesModel');
const recipeSchema = require('../schemas/recipeSchema');

const errorMessage = (code, message) => ({ err: { code, message } });

const codesHttpErrors = {
  HTTP_BAD_REQUEST: 400,
  HTTP_CONFLICT: 409,
  HTTP_UNAUTHORIZED: 401,
};

const messages = {
  invalidEntries: 'Invalid entries. Try again.',
};

const validateEntries = (name, ingredients, preparation) => {
  const { error } = recipeSchema.validate({ name, ingredients, preparation });

  if (error) { return false; }
  return true;
};

const created = async (name, ingredients, preparation, userId) => {
  if (!validateEntries(name, ingredients, preparation)) {
    return Promise.reject(
      errorMessage(codesHttpErrors.HTTP_BAD_REQUEST, messages.invalidEntries),
    );
  }

  return recipesModel.create(name, ingredients, preparation, userId);
};

const getRecipes = async () => {
  const recipes = await recipesModel.getAll();
  if (!recipes) return null;
  return recipes;
};

module.exports = {
  created,
  getRecipes,
};

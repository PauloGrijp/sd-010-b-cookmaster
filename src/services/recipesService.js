const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');
const recipeSchema = require('../schemas/recipeSchema');

const errorMessage = (code, message) => ({ err: { code, message } });

const codesHttpErrors = {
  HTTP_BAD_REQUEST: 400,
  HTTP_CONFLICT: 409,
  HTTP_UNAUTHORIZED: 401,
  HTTP_NOT_FOUND: 404,
};

const messages = {
  invalidEntries: 'Invalid entries. Try again.',
  recipeNotFound: 'recipe not found',
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

const validateId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return Promise.reject(
      errorMessage(codesHttpErrors.HTTP_NOT_FOUND, messages.recipeNotFound),
      );
    }
    
  const recipe = await recipesModel.getById(id);
  if (!recipe) {
    return Promise.reject(
      errorMessage(codesHttpErrors.HTTP_NOT_FOUND, messages.recipeNotFound),
    );
  }
  return recipe;
};

const validateUpdate = async (id, body, userId) => {
  const updateRecipe = await recipesModel.updateRecipe(id, body, userId);

  return updateRecipe;
};

const validateDelete = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const deleteProduct = await recipesModel.deleteRecipe(id);
  if (deleteProduct.deletedCount === 1) return true;
};

module.exports = {
  created,
  getRecipes,
  validateId,
  validateUpdate,
  validateDelete,
};

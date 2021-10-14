const { ObjectId } = require('mongodb');
const ajv = require('../schemas/validation');
const AppError = require('../errorHandler/AppError');
const httpCodes = require('../constants/httpCodes.json');
const errorMessages = require('../constants/errorMessages.json');
const { recipesModel } = require('../models');

exports.createRecipeSvc = async (recipe) => {
  const validate = ajv.getSchema('recipes');
  const isValid = validate(recipe);
  if (isValid) return recipesModel.createRecipe(recipe);
  throw new AppError(httpCodes.HTTP_BAD_REQUEST, validate.errors[0].message);
};

exports.getRecipesSvc = async () => recipesModel.getRecipes();

exports.findRecipeSvc = async (id) => {
  const recipe = ObjectId.isValid(id) && await recipesModel.findRecipe(id);
  if (recipe) return recipe;
  throw new AppError(httpCodes.HTTP_NOT_FOUND, errorMessages.RECIPE_NOT_FOUND);
};

exports.updateRecipeSvc = async (recipeId, recipe, { _id: id, role }) => {
  const dbRecipe = ObjectId.isValid(recipeId) && await recipesModel.findRecipe(recipeId);
  if (dbRecipe.userId === id || role === 'admin') {
    await recipesModel.updateRecipe(recipeId, recipe);
    return recipesModel.findRecipe(recipeId);
  }
  throw new AppError(httpCodes.HTTP_NOT_FOUND, errorMessages.RECIPE_NOT_FOUND);
};

exports.deleteRecipeSvc = async (recipeId, { _id: id, role }) => {
  const dbRecipe = ObjectId.isValid(recipeId) && await recipesModel.findRecipe(recipeId);
  if (dbRecipe && (dbRecipe.userId === id || role === 'admin')) {
    return recipesModel.deleteRecipe(recipeId);
  }
  throw new AppError(httpCodes.HTTP_NOT_FOUND, errorMessages.RECIPE_NOT_FOUND);
};

const Joi = require('joi');
const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const invalidEntriesError = {
  message: 'Invalid entries. Try again.',
};

const recipeNotExistsError = {
  message: 'recipe not found',
};

const unauthorizedUserError = {
  message: 'unauthorized user',
};

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const registerNewRecipe = async (recipe, userInfo) => {
  const { error } = recipeSchema.validate(recipe);
  
  if (error) return invalidEntriesError;
  return recipesModel.registerNewRecipe(recipe, userInfo);
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return recipeNotExistsError;
  const recipe = await recipesModel.getRecipeById(id);

  if (recipe === false) return recipeNotExistsError;
  return recipe;
};

const updateRecipeById = async (recipe, userInfo, id) => {
  if (!ObjectId.isValid(id)) return recipeNotExistsError;
  const { _id, role } = userInfo;
  const { error } = recipeSchema.validate(recipe);
  const targetRecipe = await getRecipeById(id);

  if (error) return invalidEntriesError;
  if (role === 'admin' || _id === targetRecipe.userId) {
    return recipesModel.updateRecipeById(recipe, userInfo, id);
  }
  return unauthorizedUserError;
};

const deleteRecipeById = async (userInfo, id) => {
  if (!ObjectId.isValid(id)) return recipeNotExistsError;
  const { _id, role } = userInfo;
  const targetRecipe = await getRecipeById(id);

  if (role === 'admin' || _id === targetRecipe.userId) {
    return recipesModel.deleteRecipeById(id);
  }
  return unauthorizedUserError;
};

const addImage = async (userInfo, image, id) => {
  if (!ObjectId.isValid(id)) return recipeNotExistsError;
  const { _id, role } = userInfo;
  const targetRecipe = await getRecipeById(id);

  if (role === 'admin' || _id === targetRecipe.userId) {
    return recipesModel.addImage(image, id);
  }
  return unauthorizedUserError;
};

module.exports = {
  registerNewRecipe,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  addImage,
};
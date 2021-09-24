const Joi = require('joi');
const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const invalidEntriesError = {
  message: 'Invalid entries. Try again.',
};

const recipeNotExistsError = {
  message: 'recipe not found',
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

module.exports = {
  registerNewRecipe,
  getRecipeById,
};
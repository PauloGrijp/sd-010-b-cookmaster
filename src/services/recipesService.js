const Joi = require('joi');
const recipesModel = require('../models/recipesModel');

const invalidEntriesError = {
  message: 'Invalid entries. Try again.',
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

module.exports = {
  registerNewRecipe,
};
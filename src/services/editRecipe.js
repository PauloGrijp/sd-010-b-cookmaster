const Joi = require('joi');
const models = require('../models');

const editRecipe = async (recipeData) => {
  const validate = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().email().required(),
    preparation: Joi.string().required(),
    id: Joi.string().required(),
    role: Joi.string().required(),
    userId: Joi.string().required(),
  }).validate(recipeData);
  if (validate.error) return { message: 'Invalid entries. Try again.' };
  const editedRecipe = await models.editRecipe(recipeData);
  if (!editedRecipe) return { message: 'recipe not found' };
  return editedRecipe;
};

module.exports = editRecipe;
const Joi = require('joi');
const models = require('../models');

const createRecipe = async (newRecipe) => {
  const validation = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
    userId: Joi.string().required(),
  }).validate(newRecipe);
  if (validation.error) return { message: 'Invalid entries. Try again.' };
  const createdRecipe = await models.createRecipe(newRecipe);
  return createdRecipe;
};

module.exports = createRecipe;
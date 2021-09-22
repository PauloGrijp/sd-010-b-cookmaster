const Joi = require('joi');
const models = require('../models');

const editRecipe = async (recipeData) => {
  const validate = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
    id: Joi.string().required(),
    role: Joi.string().required(),
    userId: Joi.string().required(),
  }).validate(recipeData);
  console.log(validate);
  if (validate.error) return { message: 'Invalid entries. Try again.' };
  const { role } = recipeData;
  if (role !== 'admin') return models.editRecipe(recipeData);
  return models.editRecipeAdmin(recipeData);
};

module.exports = editRecipe;
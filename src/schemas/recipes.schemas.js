const Joi = require('joi');

const registerRecipeValidation = (name, ingredients, preparation) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });
  if (error) throw error;
};

module.exports = { registerRecipeValidation };
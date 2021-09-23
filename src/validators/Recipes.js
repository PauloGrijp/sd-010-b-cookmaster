const Joi = require('joi');

const recipeValidator = (data) => {
  const recipe = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  });

  return recipe.validate(data);
};

module.exports = recipeValidator; 
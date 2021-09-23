const Joi = require('joi');

const recipeValidator = (data) => {
  const recipe = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  });

  return recipe.validate(data);
};

const recipeIdValidator = (id) => {
  const recipe = Joi.object({ id: Joi.string().min(24).required() });

  return recipe.validate(id);
};

module.exports = {
  recipeValidator,
  recipeIdValidator,
}; 
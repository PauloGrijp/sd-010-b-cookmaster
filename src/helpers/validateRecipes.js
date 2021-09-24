const Joi = require('@hapi/joi');

const schemaRecipes = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

module.exports = {
  schemaRecipes,
};
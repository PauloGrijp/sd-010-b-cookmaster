const Joi = require('joi');

const MIN_LENGTH_PASSWORD = 3;

const validateCredentials = (userData) => {
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string(MIN_LENGTH_PASSWORD).required(),
  }).validate(userData);
};

const validateRecipe = (recipeData) =>
  Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(recipeData);

module.exports = {
  validateCredentials,
  validateRecipe,
};

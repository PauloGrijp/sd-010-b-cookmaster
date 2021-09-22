const Joi = require('joi');

const validateRecipeBody = (name, ingredients, preparation) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });

  if (error) throw error;
};

const isRecipe = (recipe) => {
  if (!recipe) {
    const error = new Error('recipe not found');
    error.code = 404;
    throw error;
  }  
};

module.exports = {
  validateRecipeBody,
  isRecipe,
};

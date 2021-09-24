const Joi = require('joi');

const validRecipes = (name, ingredients, preparation) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });

  if (error) throw error;
};

const checkRecipe = (recipe) => {
  if (!recipe) {
    const error = new Error('recipe not found');
    error.code = 404;
    throw error;
  }  
};

module.exports = {
  validRecipes,
  checkRecipe,
};

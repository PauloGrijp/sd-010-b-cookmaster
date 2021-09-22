const Joi = require('joi');
const recipesModel = require('../model/recipesModel');

const createRecipes = async ({ name, ingredients, preparation, userId }) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });

  if (error) return 'keyNotExist';

  const recipes = await recipesModel.createRecipes({ name, ingredients, preparation, userId });
  
  return recipes;
};

module.exports = {
  createRecipes,
};

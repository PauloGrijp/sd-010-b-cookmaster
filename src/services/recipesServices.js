const Joi = require('joi');
const RecipesModel = require('../models/recipesModel');

const validateRecipes = async (name, ingredients, preparation) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(), 
    preparation: Joi.string().required(),
    }).validate({ name, ingredients, preparation });
    if (error) return error;
    return false;
};

const registerRecipes = async (name, ingredients, preparation, userId) => {
  const validateField = await validateRecipes(name, ingredients, preparation);
  if (validateField) {
 return {
    status: 400,
    message: 'Invalid entries. Try again.',
  }; 
}
  const postRecipes = await RecipesModel.registerRecipes(name, ingredients, preparation, userId);
  return postRecipes;
};

const getAllRecipes = async () => RecipesModel.getAllRecipes();

const getOneRecipes = async (id) => {
  const oneRecipe = await RecipesModel.getOneRecipes(id);
  if (!oneRecipe) {
 return {
    status: 404,
    message: 'recipe not found',
  }; 
}
return oneRecipe;
}; 

const updateRecipes = async (body, id, _userId) => {
  const update = await RecipesModel.updateRecipes(body, id, _userId);
  return update;
};

module.exports = { 
  registerRecipes,
  getAllRecipes,
  getOneRecipes,
  updateRecipes,
 };

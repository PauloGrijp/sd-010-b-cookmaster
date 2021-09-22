const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipes');

const codes = require('../httpcodes');
const validateRecipeCreation = require('../util/validateRecipeCreation');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { error } = validateRecipeCreation(name, ingredients, preparation);
  if (error) return { error };

  const recipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);

  return { recipe };
};

const getRecipes = async () => {
  const recipes = await recipesModel.getRecipes();

  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { error: { code: codes.notFound, message: 'recipe not found' } };
  }

  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) return { error: { code: codes.notFound, message: 'recipe not found' } };

  return { recipe };
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
};

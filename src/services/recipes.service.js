const RecipeModel = require('../models/recipes.model');

const RecipesValidation = require('../schemas/recipes.schemas');

const createRecipe = async (name, ingredients, preparation, userId) => {
  RecipesValidation.registerRecipeValidation(name, ingredients, preparation);
  const recipe = await RecipeModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

module.exports = { createRecipe };
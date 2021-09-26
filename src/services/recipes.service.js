const RecipeModel = require('../models/recipes.model');

const RecipesValidation = require('../schemas/recipes.schemas');

const createRecipe = async (name, ingredients, preparation, userId) => {
  RecipesValidation.registerRecipeValidation(name, ingredients, preparation);
  const recipe = await RecipeModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

const getRecipeById = async (id) => {
  const recipe = await RecipeModel.getRecipeById(id);
  RecipesValidation.validationRecipe(recipe);
  return recipe;
};

const getAllRecipes = () => RecipeModel.getAllRecipes();

const updateRecipe = async (id, name, ingredients, preparation) => {
  const updatedRecipe = await RecipeModel.updateRecipe(id, name, ingredients, preparation);
  return updatedRecipe;
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe };
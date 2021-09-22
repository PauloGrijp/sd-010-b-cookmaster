const recipesModel = require('../models/recipesModel');

function validateFields(name, ingredients, preparation) {
  if (!name || !ingredients || !preparation) return false;

  return true;
}

async function createRecipe({ name, ingredients, preparation, userId }) {
  const newRecipe = await recipesModel.createRecipe({ name, ingredients, preparation, userId });

  return newRecipe;
}

async function getAllRecipes() {
  const recipes = await recipesModel.getAllRecipes();

  return recipes;
}

async function getRecipeById(id) {
  const recipe = recipesModel.getRecipeById(id);

  return recipe;
}

module.exports = {
  validateFields,
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
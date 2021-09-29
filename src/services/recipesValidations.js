const { ObjectId } = require('mongodb');
const recipesValidations = require('../models/recipesModels');

const validateRecipes = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return false;
  }
  return true;
};

const createRecipes = async ({ name, ingredients, preparation }) => {
  const validRecipesFields = validateRecipes(name, ingredients, preparation);
  if (!validRecipesFields) {
    return { message: 'Invalid entries. Try again.' };  
  }
  const { id } = await recipesValidations.createRecipes({ name, ingredients, preparation });
  return { name, ingredients, preparation, id };
};

const getAllRecipes = async () => {
  const allRecipes = await recipesValidations.getAllRecipes();
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isvalid(id)) {
    return { message: 'recipe not found' };
  }
  const recipeById = await recipesValidations.getRecipeById(id);
  if (!recipeById) {
    return { message: 'recipe not found' };
  }
  return recipeById;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
};
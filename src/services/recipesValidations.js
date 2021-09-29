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
  const recipeById = await recipesValidations.getRecipeById(id);
  return recipeById;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
};
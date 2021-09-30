const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModels');

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
  const { id } = await recipesModel.createRecipes({ name, ingredients, preparation });
  return { name, ingredients, preparation, id };
};

const getAllRecipes = async () => {
  const allRecipes = await recipesModel.getAllRecipes();
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { message: 'recipe not found' };
  }
  const recipeById = await recipesModel.getRecipeById(id);
  console.log(recipeById);
  if (!recipeById) {
    return { message: 'recipe not found' };
  }
  return recipeById;
};

const updateRecipe = async ({ name, ingredients, preparation }, id) => {
  const recipeToUpdate = await recipesModel.updateRecipe({ name, ingredients, preparation }, id);
  if (!recipeToUpdate) {
    return { message: 'recipe not found' };
  }
  return { name, ingredients, preparation, id };
};

const deleteRecipe = async ({ id }) => {
  if (!id) return { message: 'recipe not found' };
  const recipe = await recipesModel.deleteRecipe(id);
  return recipe;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
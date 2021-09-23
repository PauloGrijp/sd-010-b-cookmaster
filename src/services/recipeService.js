const { addNewRecipeModel, getRecipes, getById, 
  deleteRecipe, editRecipe } = require('../models/recipeModel');

const addNewRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await addNewRecipeModel(name, ingredients, preparation, userId);
  return recipe;
};

const getRecipe = async () => {
  const recipe = await getRecipes();
  return recipe;
};

const getRecipeById = async (id) => {
  const recipe = await getById(id);
  return recipe;
};

const deletedRecipe = async (id) => {
  const recipe = await deleteRecipe(id);
  return recipe;
};

const editedRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await editRecipe(id, name, ingredients, preparation);
  return recipe;
};

module.exports = { addNewRecipe, getRecipe, getRecipeById, deletedRecipe, editedRecipe };
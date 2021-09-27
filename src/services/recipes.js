const { ObjectId } = require('mongodb');
const { recipes, createRecipe, uniquiRecipe, editRecipe } = require('../models/recipes');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await createRecipe(name, ingredients, preparation, userId);

  return recipe;
};

const updateRecipe = async (id, body, { userId }) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await editRecipe(id, body, userId);
  return recipe;
};

const allRecipes = async () => {
  const recipesList = await recipes();

  return recipesList;
};

const recipeBy = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const recipeReceived = await uniquiRecipe(id);

  return recipeReceived;
};

module.exports = {
  addRecipe,
  allRecipes,
  recipeBy,
  updateRecipe,
};

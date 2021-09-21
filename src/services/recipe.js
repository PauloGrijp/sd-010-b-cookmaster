const { ObjectId } = require('mongodb');

const Models = require('../models');

const create = async (recipeData, userId) => {
  const joinRecipeData = { ...recipeData, userId };
  const recipeCreate = await Models.recipe.create(joinRecipeData);

  return recipeCreate;
};

const listRecipes = async () => {
  const recipeList = await Models.recipe.listRecipes();

  return recipeList;
};

const findRecipe = async (id) => {
  const validId = ObjectId.isValid(id);
  
  if (!validId) return false;

  const recipeFound = await Models.recipe.findRecipe(id);

  return recipeFound;
};

module.exports = { create, listRecipes, findRecipe };

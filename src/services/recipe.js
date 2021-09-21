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

const edit = async (id, recipe) => {
  const validId = ObjectId.isValid(id);

  if (!validId) return false;

  const recipeFound = await Models.recipe.edit(id, recipe);

  return recipeFound;
};

const exclude = async (recipeId, userId) => {
  const validRecipeId = ObjectId.isValid(recipeId);
  const validUserId = ObjectId.isValid(userId);

  if (!validRecipeId || !validUserId) return false;
  
  const { _id, role } = await Models.user.findById(userId);
  const recipe = await Models.recipe.findRecipe(recipeId);

  if (
    ObjectId(_id).toString() !== ObjectId(recipe.userId).toString()
    && role !== 'admin'
  ) return false; 

  const recipeDeleted = await Models.recipe.exclude(recipeId);

  return recipeDeleted;
};

module.exports = { create, listRecipes, findRecipe, edit, exclude };

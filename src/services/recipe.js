const { ObjectId } = require('mongodb');

const Models = require('../models');

const validateUser = async (recipe, user) => {
  const { _id, role } = await Models.user.findById(user);
  const { userId } = await Models.recipe.findRecipe(recipe);

  return (
    ObjectId(_id).toString() === ObjectId(userId).toString() || role === 'admin'
  );
};

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
  
  const validUser = await validateUser(recipeId, userId);
  if (!validUser) return false;

  const recipeDeleted = await Models.recipe.exclude(recipeId);

  return recipeDeleted;
};

const addImage = async (recipeId, userId, filename) => {
  const validRecipeId = ObjectId.isValid(recipeId);
  const validUserId = ObjectId.isValid(userId);
  
  if (!validRecipeId || !validUserId) return false;
  
  const validUser = await validateUser(recipeId, userId);

  if (!validUser) return false;
  
  const path = `localhost:3000/src/uploads/${filename}`;
  const recipeUpdate = await Models.recipe.addImage(recipeId, path);

  return recipeUpdate;
};

module.exports = { create, listRecipes, findRecipe, edit, exclude, addImage };

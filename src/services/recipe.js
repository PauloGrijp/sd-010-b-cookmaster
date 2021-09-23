const { ObjectId } = require('mongodb');
const Models = require('../models');

const validateUser = async (recipe, user) => {
  const { _id, role } = await Models.user.findById(user);
  const { userId } = await Models.recipe.findRecipe(recipe);

  const matchId = ObjectId(_id).toString() === ObjectId(userId).toString();

  return matchId || role === 'admin';
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
  if (!ObjectId.isValid(id)) return false;

  const recipeFound = await Models.recipe.findRecipe(id);

  return recipeFound;
};

const edit = async (recipeId, userId, recipe) => {
  if (!ObjectId.isValid(recipeId) || !ObjectId.isValid(userId)) return false;

  const validUser = await validateUser(recipeId, userId);

  if (!validUser) return false;

  const recipeFound = await Models.recipe.edit(recipeId, recipe);

  return recipeFound;
};

const exclude = async (recipeId, userId) => {
  if (!ObjectId.isValid(recipeId) || !ObjectId.isValid(userId)) return false;

  const validUser = await validateUser(recipeId, userId);

  if (!validUser) return false;

  const recipeDeleted = await Models.recipe.exclude(recipeId);

  return recipeDeleted;
};

const addImage = async (recipeId, userId, filename) => {
  if (!ObjectId.isValid(recipeId) || !ObjectId.isValid(userId)) return false;

  const validUser = await validateUser(recipeId, userId);

  if (!validUser) return false;

  const path = `localhost:3000/src/uploads/${filename}`;
  const recipeUpdate = await Models.recipe.addImage(recipeId, path);

  return recipeUpdate;
};

module.exports = { create, listRecipes, findRecipe, edit, exclude, addImage };

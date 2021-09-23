const { ObjectId } = require('mongodb');

const recipeModel = require('../model/recipeModel');
const userModel = require('../model/userModel');

const createRecipe = async (recipe, email) => {
  const { _id } = await userModel.getByEmail(email);
  const recipeWithUser = recipe;
  recipeWithUser.userId = _id;
  const idRecipe = await recipeModel.createRecipe(recipeWithUser);
  return {
    userId: _id,
    _id: idRecipe,
  };
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getAllRecipes();
  return recipes.toArray();
};

const getById = async (id) => {
  const recipe = await recipeModel.getById(id);
  return recipe;
};

const editRecipe = async (edition, id) => {
  const { value: { _id } } = await recipeModel.editRecipe(edition, id);
  const result = {
    _id,
    ...edition,
  };
  return result;
};

const getIdByEmail = async (email) => {
  const { _id } = await userModel.getByEmail(email);
  return _id;
};

const deleteRecipe = async (userId, recipeId) => {
  const { userId: recipeUserId } = await recipeModel.getById(recipeId);
  if (userId === recipeUserId && ObjectId.isValid(recipeId)) {
    await recipeModel.deleteRecipe(recipeId);
  }
};

const insertImage = async (id) => {
  const { value } = await recipeModel.insertImage(id);
  return value;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  editRecipe,
  getIdByEmail,
  deleteRecipe,
  insertImage,
};

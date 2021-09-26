const recipeModel = require('../models/recipeModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const create = await recipeModel.create(name, ingredients, preparation, userId);
  return create;
};

const getAll = async () => {
  const recipes = await recipeModel.getAll();
  return recipes;
};

const getById = async (id) => {
  const recipe = await recipeModel.getById(id);
  return recipe;
};

const updateRecipe = async ({ id, name, ingredients, preparation }) => {
  const updatedRecipe = await recipeModel.updateRecipe({ id, name, ingredients, preparation });
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const exclude = await recipeModel.deleteRecipe(id);
  return exclude;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
};
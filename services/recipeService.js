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

module.exports = {
  createRecipe,
  getAll,
  getById,
};
const RecipesModel = require('../models/recipesModel');

const create = async (recipeInput, id) => {
  const recipeCreated = await RecipesModel.create(recipeInput, id);
  return recipeCreated;
};

const getAll = async () => {
  const allRecipes = await RecipesModel.getAll();
  return allRecipes;
};

const getById = async (id) => {
  const recipe = await RecipesModel.getById(id);
  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
};

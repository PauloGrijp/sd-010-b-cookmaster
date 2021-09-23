const RecipesModel = require('../models/recipesModel');

const create = async (recipeInput, id) => {
  const recipeCreated = await RecipesModel.create(recipeInput, id);
  return recipeCreated;
};

const getAll = async () => {
  const allRecipes = await RecipesModel.getAll();
  return allRecipes;
};

module.exports = {
  create,
  getAll,
};

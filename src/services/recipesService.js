const Recipes = require('../models/recipesModels');

const create = async (recipe) => {
  const newRecipe = await Recipes.create(recipe);
  return newRecipe;
};

const getAll = async () => {
  const recipes = await Recipes.getAll();
  return recipes;
};

module.exports = {
  create,
  getAll,
};
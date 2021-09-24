const Recipes = require('../models/recipesModels');

const create = async (recipe) => {
  const newRecipe = await Recipes.create(recipe);
  return newRecipe;
};

module.exports = {
  create,
};
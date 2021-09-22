const { getOne } = require('../models/recipeModel');

const readRecipe = async (id) => {
  const recipe = await getOne(id);
  if (!recipe) return null;

  return recipe;
};

module.exports = { readRecipe };
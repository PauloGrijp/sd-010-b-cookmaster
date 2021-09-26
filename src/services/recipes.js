const { getOne } = require('../models/recipes');

const readRecipe = async (id) => {
  const recipe = await getOne(id);
  if (!recipe) return null;

  return recipe;
};

module.exports = { readRecipe };

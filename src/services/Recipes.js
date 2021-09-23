const Recipe = require('../models/Recipes');

const createRecipe = async (data) => {
  const recipe = await Recipe.createRecipe(data);

  return recipe;
};

module.exports = {
  createRecipe,
};
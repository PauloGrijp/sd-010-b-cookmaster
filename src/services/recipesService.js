const model = require('../models/recipesModel');

const createRecipe = async (recipe, id) => {
  const newRecipe = await model.createRecipe(recipe, id);
  return newRecipe;
};

module.exports = {
  createRecipe,
};

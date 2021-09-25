const recipeModel = require('../models/recipeModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const create = await recipeModel.create(name, ingredients, preparation, userId);
  return create;
};

module.exports = {
  createRecipe,
};
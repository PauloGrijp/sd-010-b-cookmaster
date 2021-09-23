const RecipesModel = require('../models/recipeModel');

const create = async (recipeInput, id) => {
  const recipeCreated = await RecipesModel.create(recipeInput, id);
  return recipeCreated;
};

module.exports = {
  create,
};

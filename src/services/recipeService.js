const { recipeModel } = require('../models');

const createRecipe = async (recipeInfo, userId) => (recipeModel.create(recipeInfo, userId));

module.exports = {
  createRecipe,
};
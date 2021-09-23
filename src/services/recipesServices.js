const recipesModels = require('../models/recipesModels');
// const { CODE_HTTP } = require('../helpers/responses');

const createRecipes = async ({ name, ingredients, preparation, userId }) => {
  const resultModel = await recipesModels.createRecipes({ name, ingredients, preparation, userId });
  return resultModel;
};

module.exports = {
  createRecipes,
};
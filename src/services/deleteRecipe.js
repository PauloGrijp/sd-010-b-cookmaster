const models = require('../models');

const deleteRecipe = async (recipeData) => {
  const { role } = recipeData;
  if (role !== 'admin') return models.deleteRecipe(recipeData);
  return models.deleteRecipeAdmin(recipeData);
};

module.exports = deleteRecipe;
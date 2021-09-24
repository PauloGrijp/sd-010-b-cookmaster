const { createRecipesModel } = require('../models/recipesModel');

const createServiceRecipes = async (name, ingredients, preparation) => {
  const result = await createRecipesModel(name, ingredients, preparation);
  return result;
};

module.exports = {
  createServiceRecipes,
};
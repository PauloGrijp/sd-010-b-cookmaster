const recipesModel = require('../models/recipesModel');

const addRecipe = async (recipeData) => {
  const recipe = await recipesModel.addRecipe(recipeData);
  console.log('recebeu do model:', recipe);
  if (!recipe) return {};

  return { recipe };
};

module.exports = { addRecipe };

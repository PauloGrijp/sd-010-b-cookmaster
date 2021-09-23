const { recipes, createRecipe } = require('../models/recipes');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await createRecipe(name, ingredients, preparation, userId);

  return recipe;
};

const allRecipes = async () => {
  const recipesList = await recipes();

  return recipesList;
};

module.exports = {
  addRecipe,
  allRecipes,
};

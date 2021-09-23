const { recipes, createRecipe } = require('../models/recipes');

const addRecipe = async (name, ingredients, preparation, authorization) => {
  const recipe = await createRecipe(name, ingredients, preparation, authorization);

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

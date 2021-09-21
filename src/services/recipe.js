const Models = require('../models');

const create = async (recipeData, userId) => {
  const joinRecipeData = { ...recipeData, userId };
  const recipeCreate = await Models.recipe.create(joinRecipeData);

  return recipeCreate;
};

const listRecipes = async () => {
  const recipeList = await Models.recipe.listRecipes();

  return recipeList;
};

module.exports = { create, listRecipes };

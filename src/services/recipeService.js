const { recipeModal } = require('../models');
const { code } = require('../schema');

const createRecipe = async (recipe, payload) => {
  const { _id } = payload;
  const { name, ingredients, preparation } = recipe;
  
  const newRecipe = {
    name,
    ingredients,
    preparation,
    userId: _id,
  };

  const recipeCreated = await recipeModal.createRecipe(newRecipe);
  const result = {
    status: code.HTTP_CREATED,
    notification: {
      recipe: recipeCreated,
    },
  };

  return result;
};

const getRecipes = async () => {
  const allRecipes = await recipeModal.getRecipes();

  const result = {
    status: code.HTTP_OK_STATUS,
    notification: allRecipes,
  };

  return result;
};

module.exports = {
  createRecipe,
  getRecipes,
};

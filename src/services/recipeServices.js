const { createRecipe, getAllRecipes } = require('../models/recipesModel');

const createNewRecipe = async (_id, name, ingredients, preparation) => {
  const newRecipe = await createRecipe(_id, name, ingredients, preparation);

  return newRecipe;
};

const allRecipes = async () => getAllRecipes();

module.exports = {
  createNewRecipe,
  allRecipes,
};

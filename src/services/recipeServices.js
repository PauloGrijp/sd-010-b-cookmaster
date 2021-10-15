const { createRecipe, getAllRecipes, findRecipeById } = require('../models/recipesModel');

const createNewRecipe = async (_id, name, ingredients, preparation) => {
  const newRecipe = await createRecipe(_id, name, ingredients, preparation);

  return newRecipe;
};

const allRecipes = async () => getAllRecipes();

const findRecipe = async (id) => findRecipeById(id);

module.exports = {
  createNewRecipe,
  allRecipes,
  findRecipe,
};

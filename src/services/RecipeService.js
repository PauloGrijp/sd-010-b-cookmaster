const RecipeModel = require('../models/RecipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return { message: 'Invalid entries. Try again.' };
  }

  const recipe = await RecipeModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

const getRecipes = async () => {
  const recipes = await RecipeModel.getRecipes();
  return recipes;
};

const findById = async (id) => {
  const getId = await RecipeModel.findById(id);

  if (!getId) {
    return { message: 'recipe not found' };
  }
  return getId;
};

module.exports = {
  createRecipe,
  getRecipes,
  findById,
};
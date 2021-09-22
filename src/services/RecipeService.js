const recipeModel = require('../models/RecipeModel');

const isValidRecipes = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return false;
  }
  return true;
};

const createRecipe = async ({ name, ingredients, preparation }) => {
  const validationRecipes = isValidRecipes(name, ingredients, preparation);
  if (!validationRecipes) {
    return {
      status: 400,
      message: 'Invalid entries. Try again.',
    };  
  }
  const { id } = await recipeModel.createRecipe({ name, ingredients, preparation });
  
  return { name, ingredients, preparation, id };
};

const getRecipeById = async (id) => {
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) {
    return {
      status: 404,
      message: 'Recipe not found.',
    };
  }
  return recipe;
};

module.exports = {
  createRecipe,
  
};
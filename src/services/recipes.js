const { recipeModel } = require('../models');

const postRecipeService = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return { err: { status: 400, message: 'Invalid entries. Try again.' } }; 
  }
  const recipePosted = await recipeModel.postRecipe(name, ingredients, preparation, userId);

  return recipePosted;
};

const getRecipesService = async () => {
  const recipes = await recipeModel.getRecipes();

  return recipes;
};

const getRecipeByIdService = async (id) => {
  const errorNotFoundObject = { err: { status: 404, message: 'recipe not found' } };
  
  if (id.length !== 24) return errorNotFoundObject;
  
  const recipe = await recipeModel.getRecipeById(id);

  if (!recipe) return errorNotFoundObject;
  
  return recipe;
};

const putRecipeByIdService = async (id, name, ingredients, preparation) => {
  const recipeChanged = recipeModel.putRecipeById(id, name, ingredients, preparation);
  return recipeChanged;
};

module.exports = { postRecipeService,
  getRecipesService,
  getRecipeByIdService,
  putRecipeByIdService };

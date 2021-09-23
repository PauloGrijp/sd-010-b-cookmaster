const Recipes = require('../models/Recipes');

const validations = require('../schemas/recipesValidation');

const NOT_FOUND = 'not_found';

const registerNewRecipe = async (recipe, userId) => {
  const ifFieldsExists = validations.ifFieldsExists(recipe);
  if (ifFieldsExists.isErrorMessage) {
    return {
      codeError: ifFieldsExists.codeError,
      isErrorMessage: ifFieldsExists.isErrorMessage,
    };
  }

  const { name, ingredients, preparation } = recipe;
  const addedRecipe = await Recipes.registerNewRecipe(name, ingredients, preparation, userId);
  if (addedRecipe.isErrorMessage) return { isErrorMessage: addedRecipe.isErrorMessage };

  return { recipe: addedRecipe };
};

const getAllRecipes = async () => {
  const allRecipes = Recipes.getAllRecipes();
  if (allRecipes.isErrorMessage) return { isErrorMessage: allRecipes.isErrorMessage };

  return allRecipes;
};

const getRecipeById = async (id) => {
  const recipe = await Recipes.getRecipeById(id);
  if (!recipe) return { codeError: NOT_FOUND, isErrorMessage: 'recipe not found' };
  if (recipe.isErrorMessage) return { recipe: recipe.isErrorMessage };

  return recipe;
};

module.exports = {
  registerNewRecipe,
  getAllRecipes,
  getRecipeById,
};

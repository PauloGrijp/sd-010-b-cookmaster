const Recipes = require('../models/Recipes');

const validations = require('../schemas/recipesValidation');

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
  const ifMongoIdIsValid = validations.ifMongoIdIsValid(id);
  if (ifMongoIdIsValid.isErrorMessage) {
    return {
      codeError: ifMongoIdIsValid.codeError,
      isErrorMessage: ifMongoIdIsValid.isErrorMessage,
    };
  }

  const recipe = await Recipes.getRecipeById(id);
  if (recipe.isErrorMessage) return { isErrorMessage: recipe.isErrorMessage };

  return recipe;
};

const editRecipeById = async (recipeId, user, newDataRecipe) => {
  const ifUserIsAuthorized = await validations.ifUserIsAuthorized(user, recipeId);
  if (ifUserIsAuthorized.isErrorMessage) {
    return {
      codeError: ifUserIsAuthorized.codeError,
      isErrorMessage: ifUserIsAuthorized.isErrorMessage,
    };
  }

  const { _id: userId } = user;
  const editedRecipe = await Recipes.editRecipeById(recipeId, newDataRecipe, userId);
  if (editedRecipe.isErrorMessage) return { isErrorMessage: editedRecipe.isErrorMessage };

  return editedRecipe;
};

module.exports = {
  registerNewRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
};

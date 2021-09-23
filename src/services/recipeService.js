const { ObjectId } = require('mongodb');
const { recipeModel } = require('../models');
const { code, verifyRecipe, error } = require('../schema');

const createRecipe = async (recipe, payload) => {
  const { _id } = payload;
  const { name, ingredients, preparation } = recipe;
  
  const newRecipe = {
    name,
    ingredients,
    preparation,
    userId: _id,
  };

  const recipeCreated = await recipeModel.createRecipe(newRecipe);
  const result = {
    status: code.HTTP_CREATED,
    notification: {
      recipe: recipeCreated,
    },
  };

  return result;
};

const getRecipes = async () => {
  const allRecipes = await recipeModel.getRecipes();

  const result = {
    status: code.HTTP_OK_STATUS,
    notification: allRecipes,
  };

  return result;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      status: code.HTTP_NOT_FOUND,
      notification: { message: error.notFound },
    };
  }

  const recipe = await recipeModel.getRecipeById(id);
  const validation = verifyRecipe.isRecipe(recipe);

  if (validation.notification) return validation;

  const result = {
    status: code.HTTP_OK_STATUS,
    notification: recipe,
  };

  return result;
};

const updateRecipe = async (update, id, idOfUser, role) => {
  if (!ObjectId.isValid(id)) {
    return {
      status: code.HTTP_NOT_FOUND,
      notification: { message: error.notFound },
    };
  }

  const { userId, _id } = await recipeModel.getRecipeById(id);
  const validation = verifyRecipe.validId(idOfUser, userId, role);

  if (validation.notification) return validation;

  await recipeModel.updateRecipe(update, id);

  const result = {
    status: code.HTTP_OK_STATUS,
    notification: { _id, ...update, userId },
  };
  
  return result;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
};

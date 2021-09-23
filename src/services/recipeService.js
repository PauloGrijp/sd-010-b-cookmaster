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
  const find = await recipeModel.getRecipeById(id);
  const validationRecipe = verifyRecipe.isRecipe(find);

  if (validationRecipe.notification) return validationRecipe;
  
  const validation = verifyRecipe.validId(idOfUser, find.userId, role);

  if (validation.notification) return validation;

  await recipeModel.updateRecipe(update, id);

  const result = {
    status: code.HTTP_OK_STATUS,
    notification: { _id: id, ...update, userId: find.userId },
  };
  
  return result;
};

const deleteRecipe = async (id, role, idOfUser) => {
  const find = await recipeModel.getRecipeById(id);
  const validationRecipe = verifyRecipe.isRecipe(find);

  if (validationRecipe.notification) return validationRecipe;
  
  const validation = verifyRecipe.validId(idOfUser, find.userId, role);

  if (validation.notification) return validation;

  const deledted = await recipeModel.deleteRecipe(id);

  if (deledted === 0) {
    return {
      status: code.HTTP_NOT_FOUND,
      notification: { message: error.notFound },
    };
  }

  return {
    status: code.HTTP_NO_CONTENT,
    notification: {},
  };
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};

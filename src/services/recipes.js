const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipes');

const codes = require('../httpcodes');
const validateRecipeCreation = require('../util/validateRecipeCreation');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { error } = validateRecipeCreation(name, ingredients, preparation);
  if (error) return { error };

  const recipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);

  return { recipe };
};

const getRecipes = async () => {
  const recipes = await recipesModel.getRecipes();

  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { error: { code: codes.notFound, message: 'recipe not found' } };
  }

  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) return { error: { code: codes.notFound, message: 'recipe not found' } };

  return { recipe };
};

const editRecipe = async (updateInfo, ids, role) => {
  const { userId, recipeId } = ids;

  const recipe = await recipesModel.getRecipeById(recipeId);

  const { userId: ownerId } = recipe;

  if (userId !== ownerId && role !== 'admin') {
    return { error: { code: codes.unhautorized, message: 'you are not the owner of this recipe' } };
  }

  const editedRecipe = await recipesModel.editRecipe(updateInfo, ids);

  return editedRecipe;
};

const deleteRecipe = async (recipeId, userId) => {
  const recipe = await recipesModel.getRecipeById(recipeId);

  const { userId: ownerId } = recipe;

  if (userId === ownerId) {
    await recipesModel.deleteRecipe(recipeId);
  }

  return null;
};

const uploadImage = async (recipeId, path, userId, userRole) => {
  const recipe = await recipesModel.getRecipeById(recipeId);

  if (!recipe) {
    return { error: { code: codes.notFound, message: 'recipe note found' } };
  }

  const { userId: ownerId } = recipe;

  if (userId !== ownerId && userRole !== 'admin') {
    return { error: { code: codes.unhautorized, message: 'you are not the owner of this recipe' } };
  }

  const completePath = `localhost:3000/${path}`;
  const editedRecipe = await recipesModel.uploadImage(recipeId, completePath);

  return editedRecipe;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  uploadImage,
};

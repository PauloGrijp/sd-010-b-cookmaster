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

const editRecipe = async (name, ingredients, preparation, ids) => {
  const recipe = await recipesModel.editRecipe(name, ingredients, preparation, ids);

  return recipe;
};

const deleteRecipe = async (recipeId, userId) => {
  const recipe = await recipesModel.getRecipeById(recipeId);

  const { userId: ownerId } = recipe;

  if (userId === ownerId) {
    await recipesModel.deleteRecipe(recipeId);
  }

  return null;
};

const uploadImage = async (id, path) => {
  const completePath = `localhost:3000/${path}`;
  const recipe = await recipesModel.uploadImage(id, completePath);

  return recipe;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  uploadImage,
};

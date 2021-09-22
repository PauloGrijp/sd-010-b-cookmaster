const recipeModel = require('../models/Recipes');

const validateEntries = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { isError: true, message: 'Invalid entries. Try again.' };
  }
};

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const checkEntries = validateEntries(name, ingredients, preparation);
  if (checkEntries) return checkEntries;

  const recipe = await recipeModel.create({ name, ingredients, preparation, userId });
  return recipe;  
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getAll();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipeId = await recipeModel.findById(id);
  if (!recipeId) {
    return { isError: true, message: 'recipe not found' };
  }

  return recipeId;
};

const updateRecipe = async (id, userId, { name, ingredients, preparation }) => {
  const recipe = await recipeModel.update(id, userId, { name, ingredients, preparation });
  return recipe;
};

const deleteRecipe = async (id) => {
  const result = await recipeModel.exclude(id);
  return result;
};

const upLoadImage = async (id, image) => {
  const recipe = await recipeModel.upLoad(id, image);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  upLoadImage,
};

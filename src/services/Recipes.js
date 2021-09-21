const recipesModels = require('../models/Recipes');

const validateEntries = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { isError: true, message: 'Invalid entries. Try again.' };
  }
};

const createRecipes = async ({ id, name, ingredients, preparation }) => {
  const isChecked = validateEntries(name, ingredients, preparation);
  if (isChecked) {
    return isChecked;
  }
  const recipes = await recipesModels.create({ id, name, ingredients, preparation });
  return recipes;
};

const getAllRecipes = async () => {
  const recipes = await recipesModels.getAll();

  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await recipesModels.findById(id);

  if (!recipe) return { isError: true, message: 'recipe not found' };
  return recipe;
};

const updateRecipe = async (id, userId, { name, ingredients, preparation }) => {
  const recipe = await recipesModels.update(id, userId, { name, ingredients, preparation });

  return recipe;
};

const deleteRecipe = async (id) => {
  const recipe = await recipesModels.exclude(id);
  return recipe;
};

const insertImageRecipe = async (id, image) => {
  const recipe = await recipesModels.insertImage(id, image);

  return recipe;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImageRecipe,
};
const {
  createRecipeData,
  getAllRecipesData,
  getRecipeData,
  updateRec,
  removeRecipeData,
  setPicFile,
} = require('../models/recipeModel');
const { ApiError } = require('../utils/ApiError');
const {
  checkRecipe,
  validateId,
  checkIfRecipeExists,
} = require('./validations');

const createRecipe = async (body) => {
  await checkRecipe(body);
  const recipe = await createRecipeData(body);
  return recipe;
};

const getAllRecipes = async () => {
  const allRecipes = await getAllRecipesData();
  return allRecipes;
};

const getRecipeById = async (id) => {
  await validateId(id);
  const recipe = await getRecipeData(id);
  if (!recipe) throw new ApiError('recipe not found', null, 404);
  return recipe;
};

const updateRecipe = async (body, idUser, idRecipe, role) => {
  await checkRecipe(body);
  await checkIfRecipeExists(idRecipe, idUser, role);
  const recipe = await updateRec(idRecipe, body, idUser);
  return recipe;
};

const removeRecipe = async (idUser, idRecipe, role) => {
  await validateId(idRecipe);
  await checkIfRecipeExists(idRecipe, idUser, role);
  const res = await removeRecipeData(idRecipe);
  return res;
};

const addRecipeFile = async (idUser, idRecipe, role) => {
  await validateId(idRecipe);
  const recipe = await checkIfRecipeExists(idRecipe, idUser, role);
  const res = await setPicFile(recipe, idRecipe, idUser);
  return res;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  removeRecipe,
  addRecipeFile,
};

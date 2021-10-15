const { createRecipe, getAllRecipes, findRecipeById, 
  updateRecipe } = require('../models/recipesModel');
const { validString } = require('./userServices');

const createNewRecipe = async (_id, name, ingredients, preparation) => {
  const newRecipe = await createRecipe(_id, name, ingredients, preparation);

  return newRecipe;
};

const allRecipes = async () => getAllRecipes();

const findRecipe = async (id) => findRecipeById(id);

const updateRecip = async (id, name, ingredients, preparation) => {
  await updateRecipe(id, name, ingredients, preparation);

  const updated = await findRecipe(id);

  return updated;
};

const isValidRecipeFields = (name, ingredients, preparation) => {
  const isValidRecipe = validString(name) && validString(ingredients) && validString(preparation);

  return isValidRecipe;
};

const isCreatorOrAdmin = async (id, _id, role) => {
  const recipe = await findRecipe(id);

  if (role === 'admin' || recipe.userId === _id) return true;

  return false;
};

module.exports = {
  createNewRecipe,
  allRecipes,
  findRecipe,
  isValidRecipeFields,
  isCreatorOrAdmin,
  updateRecip,
};

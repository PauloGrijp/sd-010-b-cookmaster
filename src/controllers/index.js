const createUsers = require('./createUsers');
const login = require('./login');
const createRecipes = require('./createRecipes');
const allRecipes = require('./getAllRecipes');
const recipeById = require('./getRecipeById');
const editRecipe = require('./editRecipe');
const deleteRecipe = require('./deleteRecipe');
const uploadImage = require('./uploadImage');

module.exports = {
  createUsers,
  login,
  createRecipes,
  allRecipes,
  recipeById,
  editRecipe,
  deleteRecipe,
  uploadImage,
};
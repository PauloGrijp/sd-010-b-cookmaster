const createUser = require('./createUser');
const login = require('./login');
const createRecipe = require('./createRecipe');
const getRecipes = require('./getRecipes');
const getRecipeById = require('./getRecipeById');
const editRecipe = require('./editRecipe');
const deleteRecipe = require('./deleteRecipe');

module.exports = {
  createUser,
  login,
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};
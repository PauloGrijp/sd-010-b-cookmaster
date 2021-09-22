const createUser = require('./createUser');
const getUser = require('./getUser');
const createRecipe = require('./createRecipe');
const getRecipes = require('./getRecipes');
const getRecipeById = require('./getRecipeById');
const { editRecipe, editRecipeAdmin } = require('./editRecipe');

module.exports = {
  createUser,
  getUser,
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  editRecipeAdmin,
};
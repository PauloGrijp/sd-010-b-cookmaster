const createUsers = require('../controllers/createUsers');
const login = require('../controllers/login');
const createRecipes = require('../controllers/createRecipes');
const allRecipes = require('../controllers/getAllRecipes');
const recipeById = require('../controllers/getRecipeById');
const editRecipe = require('../controllers/editRecipe');

module.exports = {
  createUsers,
  login,
  createRecipes,
  allRecipes,
  recipeById,
  editRecipe,
};
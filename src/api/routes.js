const getPosts = require('../controllers/posts');
const createUsers = require('../controllers/createUsers');
const login = require('../controllers/login');
const createRecipes = require('../controllers/createRecipes');
const allRecipes = require('../controllers/getAllRecipes');
const recipeById = require('../controllers/getRecipeById');

module.exports = {
  getPosts,
  createUsers,
  login,
  createRecipes,
  allRecipes,
  recipeById,
};
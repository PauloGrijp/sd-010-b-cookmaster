const createUsers = require('../controllers/createUser');
const login = require('../controllers/login');
const createRecipe = require('../controllers/createRecipe');
const getRecipes = require('../controllers/getRecipes');
const getRecipesById = require('../controllers/getRecipesById');
const updateRecipe = require('../controllers/updateRecipe');

module.exports = { 
  createUsers,
  login,
  createRecipe,
  getRecipes,
  getRecipesById,
  updateRecipe,
};
const createUser = require('./createUser');
const getUser = require('./getUser');
const createRecipe = require('./createRecipe');
const getRecipes = require('./getRecipes');
const getRecipeById = require('./getRecipeById');
const { editRecipe, editRecipeAdmin } = require('./editRecipe');
const { deleteRecipe, deleteRecipeAdmin } = require('./deleteRecipe');
const { upload, uploadAdmin } = require('./upload');

module.exports = {
  createUser,
  getUser,
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  editRecipeAdmin,
  deleteRecipe,
  deleteRecipeAdmin,
  upload,
  uploadAdmin,
};
const { getUserByEmail } = require('../models/userModel');
const { ApiError } = require('../utils/ApiError');
const { getRecipeData } = require('../models/recipeModel');

const verifyEmail = (email) => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return email.match(pattern);
};

const validateId = (id) => {
  if (!id || id.length !== 24) {
    throw new ApiError('recipe not found', null, 404);
  }
};

const validateUser = async (email) => {
  const user = await getUserByEmail(email);
  if (user) {
    throw new ApiError('Email already registered', null, 409);
  }
};

const validateUserData = (email, name, password) => {
  if (!name || !email || !verifyEmail(email) || !password) {
    throw new ApiError('Invalid entries. Try again.', null, 400);
  }
};

const validateCredentials = async (email, password) => {
  if (!email || !password) {
    throw new ApiError('All fields must be filled', null, 401);
  }
};

const checkRecipe = (body) => {
  const { name, preparation, ingredients } = body;
  if (!name || !ingredients || !preparation) {
    throw new ApiError('Invalid entries. Try again.', null, 400);
  }
};

const checkOwnerOrAdmin = (recipeId = '', idUser, role) => {
  if (recipeId.toString() === idUser.toString() || role === 'admin') {
    return true;
  }
  return false;
};

const checkIfRecipeExists = async (idRecipe, idUser, role) => {
  const recipe = await getRecipeData(idRecipe);
  if (!recipe) throw new ApiError('There is no recipe with this id', null, 404);
  const checkCredentials = await checkOwnerOrAdmin(recipe.userId, idUser, role);
  if (!checkCredentials) {
    throw new ApiError('you do not have permission for this action!', null, 404);
  }
  return recipe;
};

module.exports = {
  validateUser,
  validateUserData,
  validateCredentials,
  validateId,
  checkOwnerOrAdmin,
  checkRecipe,
  checkIfRecipeExists,
};

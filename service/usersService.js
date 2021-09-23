const userModel = require('../models/usersModel');
const tokenService = require('./auth');

const validateRegister = (userData) => {
  if (!userData.name || !userData.email || !userData.password) {
    const error = {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
    throw error;
  }
};

const validateEmail = async (email) => {
  const regex = await RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  if (!regex) {
    const error = {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
    throw error;
  }
  const emailExists = await userModel.findEmail(email);
  if (emailExists !== null) {
    const error = {
      status: 409,
      message: 'Email already registered',
    };
    throw error;
  }
};

const userRegister = async (userData) => {
  validateRegister(userData);
  await validateEmail(userData.email);
  const newUser = { ...userData, role: 'user' };
  const result = await userModel.userRegisterModel(newUser);
  return result;
};

const loginValidator = async (userData) => {
  const { email, password } = userData;
  const user = await userModel.findEmail(email);
  if (!email || !password) {
    const error = {
      status: 401,
      message: 'All fields must be filled',
    };
    throw error;
  }

  const result = await userModel.validadeLogin(email, password);
  if (!result) {
    const error = { status: 401, message: 'Incorrect username or password' };
    throw error;
  }

  const { _id, role } = user;
  return tokenService.generateToken(email, _id, role);
};

const createRecipe = async (bodyObject, userId) => {
  const { name, ingredients, preparation } = bodyObject;
  const result = await userModel.createRecipeModel(
    name,
    ingredients,
    preparation,
    userId,
  );
  if (!name || !ingredients || !preparation) {
    const error = {
      message: 'Invalid entries. Try again.',
      status: 400,
    };
    throw error;
  }
  return result;
};

const allRecipes = async () => {
  const result = await userModel.getAllRecipes();
  return result;
};

const getOneRecipe = async (id) => {
  const result = await userModel.getOneRecipe(id);
  return result;
};

const editOneRecipe = async (id, recipeObject, userId) => {
  const result = await userModel.editOneRecipe(id, recipeObject, userId);
  return result;
};

const deleteOneRecipe = async (id) => {
  const result = await userModel.deleteOneRecipe(id);
  return result;
};

const upload = async (id, path) => {
  const result = await userModel.upload(id, path);
  return result;
};

module.exports = {
  userRegister,
  loginValidator,
  createRecipe,
  allRecipes,
  getOneRecipe,
  editOneRecipe,
  deleteOneRecipe,
  upload,
};

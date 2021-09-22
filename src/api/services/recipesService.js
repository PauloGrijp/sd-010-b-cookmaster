const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { secret } = require('./loginService');
const usersModel = require('../models/usersModel');
const recipesModel = require('../models/recipesModel');

const {
  ERROR_INVALID_ENTRIES, ERROR_JWT_MALFORMED, ERROR_MISSING_TOKEN, ERROR_NOT_FOUND_RECIPE,
} = require('./msgErrors');

const checkRecipe = Joi.object().keys({
  name: Joi.string().not().empty().required(),
  ingredients: Joi.string().not().empty().required(),
  preparation: Joi.string().not().empty().required(),
});

const validateToken = async (token) => {
  if (!token) { throw ERROR_MISSING_TOKEN; }
  try {
    const decoded = jwt.verify(token, secret);
    const { email } = decoded.data;
    const user = await usersModel.getUserByEmail(email);
    if (!user) { throw ERROR_JWT_MALFORMED; }
    return decoded.data;
  } catch (error) {
    throw ERROR_JWT_MALFORMED;
  }
};

const validateId = (id) => (ObjectId.isValid(id));

// ------------------------------------------------------------------------------------------------------------------------

const createRecipe = async (newRecipe, authorization) => {
  const validatedTtoken = await validateToken(authorization);
  
  const { error } = checkRecipe.validate(newRecipe);
  if (error) { throw ERROR_INVALID_ENTRIES; }

  const { _id: userId } = validatedTtoken;
  const recipe = { ...newRecipe };
  recipe.userId = userId;

  const createdRecipe = await recipesModel.createRecipe(recipe);
  return {
    status: 201,
    createdRecipe,
  };
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return {
    status: 200,
    recipes,
  };
};

const getRecipeById = async (id) => {
  if (!validateId(id)) { throw ERROR_NOT_FOUND_RECIPE; }

  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) { throw ERROR_NOT_FOUND_RECIPE; }

  return {
    status: 200,
    recipe,
  };
};

module.exports = {
  validateToken,
  createRecipe,
  getAllRecipes,
  getRecipeById,
};

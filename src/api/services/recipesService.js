const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { secret } = require('./loginService');
const usersModel = require('../models/usersModel');
const recipesModel = require('../models/recipesModel');

const { ERROR_INVALID_ENTRIES, ERROR_JWT_MALFORMED, ERROR_MISSING_TOKEN } = require('./msgErrors');

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

module.exports = {
  validateToken,
  createRecipe,
};

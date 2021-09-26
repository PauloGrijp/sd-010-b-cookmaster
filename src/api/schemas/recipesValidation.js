const { ObjectID } = require('mongodb');

const Recipes = require('../models/Recipes'); 

const BAD_REQUEST = 'bad_request';
const NOT_FOUND = 'not_found';
// const CONFLICT = 'conflict';
const UNAUTHORIZED = 'unauthorized';

const ifFieldsExists = (recipe) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) {
    return {
      codeError: BAD_REQUEST,
      isErrorMessage: 'Invalid entries. Try again.',
    };
  }

  return true;
};

const ifMongoIdIsValid = (id) => {
  if (!ObjectID.isValid(id)) {
    return {
      codeError: NOT_FOUND,
      isErrorMessage: 'recipe not found',
    };
  }

  return true;
};

const ifUserIsAuthorized = async ({ role, _id }, recipeId) => {
  if (role === 'admin') return true;

  const recipe = await Recipes.getRecipeById(recipeId);
  if (recipe.isErrorMessage) return { isErrorMessage: recipe.isErrorMessage };

  if (_id.toString() !== recipe.userId.toString()) {
    return {
      codeError: UNAUTHORIZED,
      isErrorMessage: 'User not authorized',
    };
  }

  return true;
};

module.exports = {
  ifFieldsExists,
  ifMongoIdIsValid,
  ifUserIsAuthorized,
};
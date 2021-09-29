const recipesModel = require('../models/recipesModel');

const recipesError = { message: 'Invalid entries. Try again.' };

const validateNewRecipe = async ({ name, ingredients, preparation }) => {
  if (!name) return recipesError;
  if (typeof ingredients !== 'string') return recipesError;
  if (!preparation) return recipesError;

  return 'SUCCESS';
};

// const getUserByEmail = async ({ email }) => {
//   const existsUser = await userModel.getUserByEmail(email);
//   return existsUser;
// };

const createRecipe = async ({ recipe, verifiedToken }) => {
  // const buff = JSON.parse(Buffer.from(code, 'base64')); // https://www.tutorialguruji.com/javascript/how-to-decode-base64-encoded-json-object-string-in-node-js/
  const validationResult = await validateNewRecipe(recipe);
  if (validationResult !== 'SUCCESS') return validationResult;

  const { _id } = verifiedToken;
  const createdUser = await recipesModel.createRecipe(recipe, _id);
  return createdUser;
};

const getAllRecipes = async () => {
  const recipesList = await recipesModel.getAllRecipes();

  return recipesList;
};

module.exports = { createRecipe, getAllRecipes };

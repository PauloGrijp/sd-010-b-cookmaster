const model = require('../models/recipesModel');
const schema = require('../schemas/recipesSchema');

const createNewRecipe = async (name, ingredients, preparation, token) => {
  const validateToken = await schema.validateToken(token);
  if (validateToken.err) return validateToken;
  const validateInput = await schema.validateNewRecipeInput(name, ingredients, preparation);
  if (validateInput.err) return validateInput;
  const { _id } = validateToken;
  const createdRecipe = await model.createNewRecipe(name, ingredients, preparation, _id);
  return createdRecipe;
};

const getAllRecipes = async () => {
  const allRecipes = await model.getAllRecipes();
  return allRecipes;
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
};

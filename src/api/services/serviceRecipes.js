const Recipe = require('../models/modelRecipes');
const { validateCreationOfRecipes } = require('../schema/validations');

const createRecipe = async (name, ingredients, preparation) => {
  const validation = validateCreationOfRecipes(name, ingredients, preparation);
  if (validation.message) return validation;

  const newRecipe = await Recipe.createRecipe(name, ingredients, preparation);

  return newRecipe;
};

module.exports = {
  createRecipe,
};
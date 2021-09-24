const { checkEmptyInputs } = require('../validations/Recipes');
const Recipes = require('../models/Recipes');

const createRecipe = (recipe, userId) => {
  const haveEmptyInputs = checkEmptyInputs(recipe);
  if (haveEmptyInputs.message) return haveEmptyInputs;

  return Recipes.createRecipe(recipe, userId);
};

module.exports = {
  createRecipe,
};

const RecipesModel = require('../models/recipeModel');

const validateFieldsRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return false;

  return true;
};

const createRecipe = async ({ name, ingredients, preparation }) => {
  const validation = validateFieldsRecipe(name, ingredients, preparation);

  if (!validation) return false;

  return RecipesModel.createRecipe({ name, ingredients, preparation });
};

module.exports = {
  createRecipe,
};
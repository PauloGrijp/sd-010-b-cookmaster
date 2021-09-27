const recipesModel = require('../models/recipesModel');

const invalidEntries = {
  error: {
    status: 400,
    message: 'Invalid entries. Try again.',
  },
};

const createRecipe = async (recipeData) => {
  const { name, ingredients, preparation } = recipeData;
  if (!name || !ingredients || !preparation) return invalidEntries;

  const createdRecipe = await recipesModel.createRecipe(recipeData);

  return {
    recipe: {
      ...createdRecipe,
    },
  };
};

module.exports = {
  createRecipe,
};
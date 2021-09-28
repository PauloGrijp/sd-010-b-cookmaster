const recipeModel = require('../models/recipeModel');

const recipeDataValidation = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return false;
  }
  return true;
};

const registerRecipeValidation = async ({ name, ingredients, preparation }) => {
  const validatedRecipe = recipeDataValidation(name, ingredients, preparation);

  if (!validatedRecipe) {
    return {
      message: 'Invalid entries. Try again.',
    };
  }

  const { id } = await recipeModel.registerRecipe({ name, ingredients, preparation });

   return { name, ingredients, preparation, id };
};

module.exports = {
  registerRecipeValidation,
};

const Recipes = require('../models/Recipes');

const validations = require('../schemas/recipesValidation');

const registerNewRecipe = async (recipe, userId) => {
  const ifFieldsExists = validations.ifFieldsExists(recipe);
  if (ifFieldsExists.isErrorMessage) {
    return {
      codeError: ifFieldsExists.codeError,
      isErrorMessage: ifFieldsExists.isErrorMessage,
    };
  }
  
  const { name, ingredients, preparation } = recipe;
  const addedRecipe = await Recipes.registerNewRecipe(name, ingredients, preparation, userId);
  if (addedRecipe.isErrorMessage) {
    return {
      codeError: addedRecipe.codeError,
      isErrorMessage: addedRecipe.isErrorMessage,
    };
  }

  return { recipe: addedRecipe };
};

module.exports = {
  registerNewRecipe,
};

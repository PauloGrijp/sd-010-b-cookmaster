const { ObjectId } = require('mongodb');
const recipeModel = require('../models/recipeModel');

// req 3
const recipeDataValidation = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return false;
  }
  return true;
};

// req 3
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

// req 5
const findRecipeByIdValidation = async (id) => {
  const verificatedId = await ObjectId.isValid(id);
  const recipeById = await recipeModel.findRecipeById(id);
  
  if (!verificatedId || !recipeById) {
    return { message: 'recipe not found' };
  }

  return recipeById;
};

module.exports = {
  registerRecipeValidation,
  findRecipeByIdValidation,
};

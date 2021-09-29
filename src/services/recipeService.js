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
  if (!verificatedId) {
    return {
      message: 'recipe not found',
    };
  }
  
  const recipeById = await recipeModel.findRecipeById(id);
  if (!recipeById) {
    return {
      message: 'recipe not found.',
    };
  }
  return recipeById;
};

// req 7
const editRecipeValidation = async ({ name, ingredients, preparation }, id) => {
  const updatedRecipe = await recipeModel.editRecipe({ name, ingredients, preparation }, id);
  if (!updatedRecipe) {
    return { message: 'recipe not found' };
  }

  return { name, ingredients, preparation, id };
};

// req 8
const delRecipeValidation = async (id) => {
  const deletedRecipe = await recipeModel.delRecipe(id);
  if (!deletedRecipe) {
    return {
      message: 'recipe not found',
    };
  }

  return deletedRecipe;
};

module.exports = {
  registerRecipeValidation,
  findRecipeByIdValidation,
  editRecipeValidation,
  delRecipeValidation,
};

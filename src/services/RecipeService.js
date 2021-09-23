const { ObjectId } = require('mongodb');
const recipeModel = require('../models/RecipeModel');

const isValidRecipes = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return false;
  }
  return true;
};

const createRecipe = async ({ name, ingredients, preparation }) => {
  const validationRecipes = isValidRecipes(name, ingredients, preparation);
  if (!validationRecipes) {
    return {
      status: 400,
      message: 'Invalid entries. Try again.',
    };  
  }
  const { id } = await recipeModel.createRecipe({ name, ingredients, preparation });
  
  return { name, ingredients, preparation, id };
};

const getRecipeById = async (id) => {
  const checkId = await ObjectId.isValid(id);
  if (!checkId) {
    return {
      status: 404,
      message: 'recipe not found',
    };
  }
  
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) {
    return {
      status: 404,
      message: 'recipe not found',
    };
  } 

  return recipe;
};

const updateRecipe = async ({ name, ingredients, preparation, id }) => {
  console.log(name, ingredients, preparation, id, 'parametros update');
  const checkId = await ObjectId.isValid(id);
  if (!checkId) {
    return {
      status: 404,
      message: 'recipe not found',
    };
  }

  const recipe = await recipeModel.updateRecipe({ name, ingredients, preparation, id });
  if (!recipe) {
    return {
      status: 404,
      message: 'recipe not found',
    };
  }
  return recipe;
};
module.exports = {
  createRecipe,
  getRecipeById,
  updateRecipe,  
};
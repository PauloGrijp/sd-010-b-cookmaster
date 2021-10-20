const { ObjectId } = require('mongodb');
const recipeModel = require('../models/RecipeModel');

const message = 'recipe not found';

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
  if (!ObjectId.isValid(id)) {
    return {
      status: 404,
      message,
    };
  }
  
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) {
    return {
      status: 404,
      message,
    };
  } 

  return recipe;
};

const updateRecipe = async ({ name, ingredients, preparation }, id) => {
  const recipe = await recipeModel.updateRecipe({ name, ingredients, preparation }, id);
  if (!recipe) {
    return {
      status: 404,
      message,
    };
  }
  return {
    name, ingredients, preparation, id, 
  };
};

const deleteRecipe = async (id) => {
  const recipe = await recipeModel.deleteRecipe(id);
  if (!recipe) {
    return {
      status: 404,
      message,
    };
  }
  
  return recipe;
};

const uploadImage = async ({ id }) => {
  const imageURL = `localhost:3000/src/uploads/${id}.jpeg`;
  const recipe = await recipeModel.uploadImage({ imageURL, id });
      
  if (!recipe) {
    return {
      status: 404,
      message,
    };
  }
  return recipe;
};

module.exports = {
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
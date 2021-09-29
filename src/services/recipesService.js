const { ObjectId } = require('mongodb');
const model = require('../models/recipesModel');

const createRecipe = async (recipe, id) => {
  const newRecipe = await model.createRecipe(recipe, id);
  return newRecipe;
};

const getAllRecipes = async () => {
  const allRecipes = await model.getAllRecipes();
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const recipe = await model.getRecipeById(id);
  if (!recipe) {
    return false;
  }
  return recipe;
};

const updateRecipe = async (recipe, id, recId) => {
  const updatedRecipe = await model.updateRecipe(recipe, id, recId);
  if (!updatedRecipe) {
    return false;
  }
  return updatedRecipe;
};

const updateImg = async (id, image) => {
  console.log('passou no service');
  const addImg = await model.updateImg(id, image);
  if (!addImg) {
    return false;
  }
  return addImg;
};

const deleteRecipe = async (id) => {
  const deletedRecipe = await model.deleteRecipe(id);
  if (deletedRecipe) {
    return deletedRecipe;
  }
  return false;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  updateImg,
  deleteRecipe,
};

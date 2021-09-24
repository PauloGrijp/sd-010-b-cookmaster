const recipesModel = require('../model/recipesModel');

const postNewRecipe = async ({ name, ingredients, preparation }) => {
  const data = await recipesModel.postNewRecipe({ name, ingredients, preparation });
  return data;
};

const getAllRecipes = async () => {
  const data = await recipesModel.getAllRecipes();
  return data;
};

const getRecipeById = async (id) => {
  const data = await recipesModel.getRecipeById(id);
  return data;
};

const updateRecipe = async ({ name, ingredients, preparation, id }) => {
  const data = await recipesModel.updateRecepi({ name, ingredients, preparation, id });
  return data;
};

const deleteRecipeById = async (id) => {
  const data = await recipesModel.deleteRecipeById(id);
  return data;
};

const insertRecipeImage = async (id) => {
  const data = await recipesModel.insertRecipeImage(id);
  return data;
};

module.exports = { 
  postNewRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipeById, insertRecipeImage };
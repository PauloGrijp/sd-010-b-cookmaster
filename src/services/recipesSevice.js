const recipesModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
const create = await recipesModel.createRecipe(name, ingredients, preparation, userId);
return create;
};

const getRecipesAll = () => recipesModel.getRecipesAll();

const getRecipesId = async (id) => {
  const getRecipe = await recipesModel.getRecipesId(id);
  return getRecipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const update = await recipesModel.updateRecipe(id, name, ingredients, preparation);
  return update;
};

const deleteRecipe = async (id) => {
  const deleteDate = await recipesModel.deleteRecipe(id);
  return deleteDate;
};

module.exports = { createRecipe, getRecipesAll, getRecipesId, updateRecipe, deleteRecipe };
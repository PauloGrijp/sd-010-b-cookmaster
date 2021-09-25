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

const updateRecipe = async (id, body, user) => {
  if (user.role === 'admin' || user.role === 'user') {
    const update = await recipesModel.updateRecipe(id, body, user);
    return update;
  }
  return {};
};
const deleteRecipe = async (id) => {
  const deleteDate = await recipesModel.deleteRecipe(id);
  return deleteDate;
};
const updateImage = async (id, image) => {
  const update = await recipesModel.updateImage(id, image);
  return update;
};
module.exports = {
  createRecipe,
  getRecipesAll,
   getRecipesId,
  updateRecipe,
  deleteRecipe,
  updateImage,
};
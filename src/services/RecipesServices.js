const RecipesModel = require('../models/RecipesModel');

const create = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) { 
    const resp = { message: 'Invalid entries. Try again.' };
    return resp;
  }

  const createdRecipe = await RecipesModel.create(name, ingredients, preparation, userId);

  return createdRecipe;
};

const getAll = async () => {
  const listRecipes = await RecipesModel.getAll();

  return listRecipes;
};

const findById = async (id) => {
  const getRecipeId = await RecipesModel.findById(id);

  if (!getRecipeId) {
    const resp = { message: 'recipe not found' };
    return resp;
  }

  return getRecipeId;
};

const update = async (id, name, ingredients, preparation) => {
  const recipeIdExists = await RecipesModel.findById(id);

  if (!recipeIdExists) {
    const resp = { message: 'recipe not found' };
    return resp;
  }

  const updateRecipe = await RecipesModel.update(id, name, ingredients, preparation);

  return updateRecipe;
};

const exclude = async (id) => {
  const deletedProduct = await RecipesModel.exclude(id);

  return deletedProduct;
};

module.exports = {
  create,
  getAll,
  findById,
  update, 
  exclude,
};
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

  console.log(getRecipeId);

  if (!getRecipeId) {
    const resp = { message: 'recipe not found' };
    return resp;
  }

  return getRecipeId;
};

module.exports = {
  create,
  getAll,
  findById,
};
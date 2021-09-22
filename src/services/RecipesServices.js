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

module.exports = {
  create,
  getAll,
};
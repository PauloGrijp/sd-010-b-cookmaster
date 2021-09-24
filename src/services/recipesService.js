const { ObjectId } = require('mongodb');
const RecipesModel = require('../models/recipesModel');

const recipeNotFound = {
  code: 404,
  message: 'recipe not found',
};

const idValidator = (id) => ObjectId.isValid(id);

const create = async (recipeInput, id) => {
  const recipeCreated = await RecipesModel.create(recipeInput, id);
  return recipeCreated;
};

const getAll = async () => {
  const allRecipes = await RecipesModel.getAll();
  return allRecipes;
};

const getById = async (id) => {
  if (!idValidator(id)) return recipeNotFound;

  const recipe = await RecipesModel.getById(id);

  if (!recipe) return recipeNotFound;
  
  return {
    code: 200,
    recipe,
  };
};

const update = async (id, recipe, userId) => {
  // const recipeToUpdate = { ...recipe, _id };
  const recipeUpdated = await RecipesModel.update(id, recipe, userId);
  return {
    code: 200,
    recipeUpdated,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};

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
  const recipeUpdated = await RecipesModel.update(id, recipe, userId);
  return {
    code: 200,
    recipeUpdated,
  };
};

const deleteRecipe = async (id, _userId) => {
  if (!idValidator(id)) return recipeNotFound;
  const itemsDeleted = await RecipesModel.deleteRecipe(id);

  if (!itemsDeleted) return { code: 404 };

  return { code: 204 };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteRecipe,
};

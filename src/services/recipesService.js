const Recipes = require('../models/recipesModels');
const Error = require('../helpers/errors');

const create = async (recipe) => {
  const newRecipe = await Recipes.create(recipe);
  return newRecipe;
};

const getAll = async () => {
  const recipes = await Recipes.getAll();
  return recipes;
};

const findId = async (id) => {
  const recipe = await Recipes.findId(id);
  if (!recipe) {
    return Error.notFound('recipe not found');
  }
  return recipe;
};

const update = async (id, recipe) => {
  const recipeUpdate = await Recipes.update(id, recipe);
  return recipeUpdate;
};

const deleteRecipe = async (id) => {
  const recipe = await Recipes.deleteRecipe(id);
  return recipe;
};

const uploadImage = async (id) => {
  const recipe = await Recipes.uploadImage(id);
  return recipe;
};

module.exports = {
  create,
  getAll,
  findId,
  update,
  deleteRecipe,
  uploadImage,
};
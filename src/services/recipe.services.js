const {
  create,
  findAll,
  findById,
  updateRecipe,
  deleteRecipe,
  insertImage,
} = require('../models/recipe.models');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await create(name, ingredients, preparation, userId);
  return newRecipe;
};

const getAll = async () => {
  const recipes = await findAll();
  return recipes;
};

const getById = async (id) => {
  const recipe = await findById(id);
  return recipe;
};

const updatingRecipe = async ({ id, name, ingredients, preparation }) => {
  const updatedRecipe = await updateRecipe({ id, name, ingredients, preparation });
  return updatedRecipe;
};

const removeRecipe = async (id) => {
  const exclude = await deleteRecipe(id);
  return exclude;
};

const addImage = async (id) => {
  const insert = await insertImage(id);
  return insert;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updatingRecipe,
  removeRecipe,
  addImage,
};
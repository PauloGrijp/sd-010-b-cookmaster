const { createRecipesModel,
  findById, getAll, update, excluse, createImage } = require('../models/recipesModel');
const { notFound } = require('../middlewares/errors');

const createServiceRecipes = async (name, ingredients, preparation) => {
  const result = await createRecipesModel(name, ingredients, preparation);
  return result;
};

const getById = async (id) => {
  const recipe = await findById(id);
  if (!recipe) return notFound('recipe not found');
  return recipe;
};

module.exports = {
  createServiceRecipes,
  getById,
  getAll,
  update,
  excluse,
  createImage,
};
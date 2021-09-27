const { 
  createRecipesModel, 
  getAllRecipes, 
  getRecipesById, 
  editeRecipesById, 
  deleteRecipesById, 
  createImage } = require('../models/recipesModel');

const { notFound } = require('../middlewares/errors');

const createServiceRecipes = async (name, ingredients, preparation) => {
  const result = await createRecipesModel(name, ingredients, preparation);
  return result;
};

const getServiceById = async (id) => {
  const recipeId = await getRecipesById(id);

  if (!recipeId) {
    return notFound('recipe not found');
  }

  return recipeId;
};

module.exports = {
  createServiceRecipes,
  getAllRecipes,
  getServiceById,
  editeRecipesById,
  deleteRecipesById,
  createImage,
};
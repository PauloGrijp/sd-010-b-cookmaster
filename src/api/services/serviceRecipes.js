const Recipe = require('../models/modelRecipes');
const { validateCreationOfRecipes, validateIdFromToken } = require('../schema/validations');

const createRecipe = async (name, ingredients, preparation, id) => {
  const validation = validateCreationOfRecipes(name, ingredients, preparation);
  if (validation.message) return validation;

  const validateToken = validateIdFromToken(id);
  if (validateToken.message) return validateToken;

  const newRecipe = await Recipe.createRecipe(name, ingredients, preparation, id);
  // console.log(newRecipe, 'serviceRecipes');
  return newRecipe;
};

const getAll = async () => Recipe.getAll();

const getRecipeById = async (id) => {
  const recipeById = await Recipe.getRecipeById(id);

  if (!recipeById) {
    return {
      message: 'recipe not found',
    };
  }

  return recipeById;
};

const updateRecipe = async (id, newUpdatedRecipe, userId) => {
  const updatedRecipe = await Recipe.updateRecipe(id, newUpdatedRecipe, userId);

  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const deleted = await Recipe.deleteRecipe(id);

  if (!deleted) return { message: 'recipe not found' };

  return deleted;
};

const updateImage = async (id, image) => {
  const newImage = await Recipe.updateImage(id, image);
  if (!newImage) return null;

  return newImage;
};

module.exports = {
  createRecipe,
  getAll,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateImage,
};
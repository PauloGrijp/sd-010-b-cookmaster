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

const getRecipeByUserId = async (userId) => Recipe.getRecipeByUserId(userId);

const updateRecipe = async (id, newUpdatedRecipe, userId) => {
  const updatedRecipe = await Recipe.updateRecipe(id, newUpdatedRecipe, userId);

  return updatedRecipe;
};

module.exports = {
  createRecipe,
  getAll,
  getRecipeById,
  getRecipeByUserId,
  updateRecipe,
};
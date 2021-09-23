const RecipesModel = require('../models/recipeModel');

const validateFieldsRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return false;

  return true;
};

const getAllRecipes = async () => {
  const recipes = await RecipesModel.getAllRecipes();

  return recipes;
};

const getRecipeById = async (id) => {
  const product = await RecipesModel.getRecipeById(id);

  if (!product) return null;

  return product;
};

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const validation = validateFieldsRecipe(name, ingredients, preparation);

  if (!validation) return false;

  return RecipesModel.createRecipe({ name, ingredients, preparation, userId });
};

const updateRecipe = async ({ id, name, ingredients, preparation }) => {
  const validation = validateFieldsRecipe(name, ingredients, preparation);

  if (!validation) return false;

  return RecipesModel.updateRecipe({ id, name, ingredients, preparation });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
};
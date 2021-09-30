const recipesModel = require('../models/recipesModel');

const invalidEntries = {
  error: {
    status: 400,
    message: 'Invalid entries. Try again.',
  },
};

const recipeNotFound = {
  error: {
    status: 404,
    message: 'recipe not found',
  },
};

const createRecipe = async (recipeData) => {
  const { name, ingredients, preparation, userId } = recipeData;
  if (!name || !ingredients || !preparation) return invalidEntries;
  const { insertedId } = await recipesModel.createRecipe(recipeData);

  return {
    recipe: {
      _id: insertedId,
      name,
      ingredients,
      preparation,
      userId,
    },
  };
};

const getAllRecipes = async () => {
  const foundRecipes = await recipesModel.getAllRecipes();
  return foundRecipes;
};

const getRecipeById = async (id) => {
  const foundRecipe = await recipesModel.getRecipeById(id);
  
  if (!foundRecipe) return recipeNotFound;
  
  return foundRecipe;
};

const updateRecipe = async (recipeData) => {
  const { name, ingredients, preparation, _id } = recipeData;
  if (!name || !ingredients || !preparation) return invalidEntries;

  await recipesModel.updateRecipe(recipeData);
  const foundRecipe = await getRecipeById(_id);
  return foundRecipe;
};

const deleteRecipe = async (id) => {
  await recipesModel.deleteRecipe(id);
};

const uploadImage = async (imageData) => {
  const { _id, imagePath } = imageData;
  if (!imagePath) return null;
  await recipesModel.uploadImage(imageData);
  
  const foundRecipe = await getRecipeById(_id);
  return foundRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
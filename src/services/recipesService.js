const model = require('../models/recipesModel');
const schema = require('../schemas/recipesSchema');

const createNewRecipe = async (name, ingredients, preparation, token) => {
  const validateToken = await schema.validateToken(token);
  if (validateToken.err) return validateToken;
  const validateInput = await schema.validateNewRecipeInput(name, ingredients, preparation);
  if (validateInput.err) return validateInput;
  const { _id } = validateToken;
  const createdRecipe = await model.createNewRecipe(name, ingredients, preparation, _id);
  return createdRecipe;
};

const getAllRecipes = async () => {
  const allRecipes = await model.getAllRecipes();
  return allRecipes;
};

const getRecipeById = async (id) => {
  const recipe = await model.getRecipeById(id);
  if (!recipe) {
    return { status: 404, err: { message: 'recipe not found' } };
  }
  return recipe;
};

const updateRecipe = async (id, body, token) => {
  const { name, ingredients, preparation } = body;
  const validateToken = await schema.validateToken(token);
  if (validateToken.err) return validateToken;
  const updatedRecipe = await model.updateRecipe(id, name, ingredients, preparation);
  return updatedRecipe;
};

const deleteRecipe = async (id, token) => {
  const validateToken = await schema.validateToken(token);
  if (validateToken.err) return validateToken;
  const modelReturn = await model.deleteRecipe(id);
  return modelReturn;
};

const uploadImage = async (id, token) => {
  const validateToken = await schema.validateToken(token);
  if (validateToken.err) return validateToken;
  return {};
};

const insertImageIntoRecipe = async (id, path) => {
  const modelResponse = await model.insertImageIntoRecipe(id, path);
  return modelResponse;
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
  insertImageIntoRecipe,
};

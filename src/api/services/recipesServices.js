const jwt = require('jsonwebtoken');
const recipesModel = require('../models/recipesModel');

// constantes de return Error
const privateKey = 'passsecret';

const BAD_ENTRIES = {
  status: 400,
  message: 'Invalid entries. Try again.',
};

const BAD_TOKEN_EXIST = {
  status: 401,
  message: 'jwt malformed',
};

const BAD_RECIPE_NOT_FOUND = {
  status: 404,
  message: 'recipe not found',
};

const BAD_TOKEN_NULL = {
  status: 401,
  message: 'missing auth token',
};

// function de valid
const validRecipe = (recipe) => {
  if (!recipe) throw BAD_RECIPE_NOT_FOUND;
};

const validName = (name) => {
  if (!name) throw BAD_ENTRIES;
};

const validIgredients = (ingredients) => {
  if (!ingredients) throw BAD_ENTRIES;
};

const validPreparation = (preparation) => {
  if (!preparation) throw BAD_ENTRIES;
};

const validAutheToken = (token) => {
  if (!token) throw BAD_TOKEN_NULL;
};

const validTokenExist = (token) => {
  try {
    const decode = jwt.verify(token, privateKey);
    return decode;
  } catch (error) {
    throw BAD_TOKEN_EXIST;
  }
};

// function de manipulação
const addRecipes = async (token, name, ingredients, preparation) => {
  validName(name);
  validIgredients(ingredients);
  validPreparation(preparation);
  validAutheToken(token);
  const decoder = validTokenExist(token);
  // console.log(decoder, 'tdecoder');
  const result = await recipesModel.addRecipes(decoder, name, ingredients, preparation);
  return result;
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);
  validRecipe(recipe);
  return recipe;
};

const getRecipeByAll = async () => {
  const result = await recipesModel.getRecipeByAll();
  return result;
};

const editRecipes = async (token, id, { name, ingredients, preparation }) => {
  validAutheToken(token); // se existe token
  validTokenExist(token); // se token valid
  // const { _id, role } = decode;
  const result = await recipesModel.editRecipes(id, name, ingredients, preparation);
  console.log(result, 'editServices');
  return result;
};

const deleteRecipes = async (token, id) => {
  validAutheToken(token);
  validTokenExist(token);
  await recipesModel.deleteRecipes(id);
};

module.exports = {
  addRecipes,
  getRecipeByAll,
  getRecipeById,
  editRecipes,
  deleteRecipes,
};
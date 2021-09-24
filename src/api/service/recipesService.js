const { ObjectId } = require('mongodb');
const Joi = require('joi');
const jwtvalid = require('../middlewares/jwtvalid');
const recipesModel = require('../model/recipesModel');

const isValidToken = (token) => {
  const validateJwt = jwtvalid(token);

  if (validateJwt === 'jwt malformed') {
    return validateJwt;
  }

  if (validateJwt === 'missing auth token') {
    return validateJwt;
  }
  return false;
};

const validarCriador = (id, userId, role) => {
  if (id === userId) return false;
  if (role === 'admin') return false;
  return true; 
};

const createRecipes = async ({ body, token }) => {
  const { name, ingredients, preparation } = body;
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });

  if (error) return 'keyNotExist';

  if (isValidToken(token)) return isValidToken(token);

  const { _id } = jwtvalid(token);

  const recipes = await recipesModel.createRecipes({ body, userId: _id });
  
  return recipes;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

const getByIdRecipes = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipes = await recipesModel.getByIdRecipes(id);
  return recipes;
};

const updateByIdRecipes = async (recId, body, token) => {
  if (!ObjectId.isValid(recId)) return null;

  if (isValidToken(token)) return isValidToken(token);

  const { _id, role } = jwtvalid(token);

  const recipeId = await getByIdRecipes(recId);

  if (validarCriador(_id, recipeId.userId, role)) return 'criadorInvalido';

  if (recipeId === null) return null;

  const recipes = await recipesModel.updateByIdRecipes(recId, _id, body);
  return recipes;
};

const deleteByIdRecipes = async (recId, token) => {
  if (!ObjectId.isValid(recId)) return null;

  if (isValidToken(token)) return isValidToken(token);

  const { _id, role } = jwtvalid(token);

  const recipeId = await getByIdRecipes(recId);

  if (validarCriador(_id, recipeId.userId, role)) return 'criadorInvalido';

  if (recipeId === null) return null;

  const recipes = await recipesModel.deleteByIdRecipes(recId);
  return recipes;
};

const createImageRecipe = async (recId, token, path) => {
  if (!ObjectId.isValid(recId)) return null;

  if (isValidToken(token)) return isValidToken(token);

  const { _id, role } = jwtvalid(token);

  const recipeId = await getByIdRecipes(recId);
  
  if (validarCriador(_id, recipeId.userId, role)) return 'criadorInvalido';

  if (recipeId === null) return null;

  const recipes = await recipesModel.createImageRecipe(recId, path);
  return recipes;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getByIdRecipes,
  updateByIdRecipes,
  deleteByIdRecipes,
  createImageRecipe,
};

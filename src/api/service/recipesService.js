const { ObjectId } = require('mongodb');
const Joi = require('joi');
const jwtvalid = require('../middlewares/jwtvalid');
const recipesModel = require('../model/recipesModel');

const createRecipes = async ({ body, token }) => {
  const { name, ingredients, preparation } = body;
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });

  if (error) return 'keyNotExist';

  const validateJwt = jwtvalid(token);

  if (validateJwt === 'jwt malformed') {
    return validateJwt;
  }

  const { _id } = validateJwt;

  const recipes = await recipesModel.createRecipes({ body, _id });
  
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
  const validateJwt = jwtvalid(token);

  const { _id } = validateJwt;

  const recipeId = await getByIdRecipes(recId);

  if (validateJwt === 'jwt malformed') {
    return validateJwt;
  }

  if (validateJwt === 'missing auth token') {
    return validateJwt;
  }

  if (recipeId === null) return null;

  const recipes = await recipesModel.updateByIdRecipes(recId, _id, body);
  return recipes;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getByIdRecipes,
  updateByIdRecipes,
};

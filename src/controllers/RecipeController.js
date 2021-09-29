const Joi = require('joi');
const RecipeService = require('../services/RecipeService');

const OK_200 = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INVALID_ENTRIES = { message: 'Invalid entries. Try again.' };
const RECIPE_NOT_FOUND = { message: 'recipe not found' };
const MISSING_TOKEN = { message: 'missing auth token' };

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id: userId } = req.user;

  const { error } = Joi.object({
    name: Joi.string().required().not().empty(),
    ingredients: Joi.string().required().not().empty(),
    preparation: Joi.string().required().not().empty(),
  }).validate(req.body);
  if (error) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);

  const response = await RecipeService.createRecipe({
    name,
    ingredients,
    preparation,
    userId,
  });

  return res.status(CREATED).json(response);
};

const getAllRecipes = async (_req, res) => {
  const response = await RecipeService.getAllRecipes();
  return res.status(OK_200).json(response);
};

const findRecipe = async (req, res) => {
  const { id } = req.params;
  const response = await RecipeService.findRecipe({ id });

  if (response === NOT_FOUND) {
    return res.status(NOT_FOUND).json(RECIPE_NOT_FOUND);
  }
  
  return res.status(OK_200).json(response); 
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  if (!userId) return res.status(UNAUTHORIZED).json(MISSING_TOKEN);

  const response = await RecipeService.updateRecipe({
    id,
    name,
    ingredients,
    preparation,
    userId,
  });
  return res.status(OK_200).json(response);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await RecipeService.deleteRecipe({ id });
  return res.status(NO_CONTENT).json();
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipe,
  updateRecipe,
  deleteRecipe,
};

const status = require('http-status');
const recipeModel = require('../models/recipeModel');
const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.user;
  const recipe = await recipeModel.add(name, ingredients, preparation, id);

  return res.status(status.CREATED).json(recipe);
};

const getAllRecipe = async (_req, res) => {
  const recipe = await recipeModel.getAll();

  return res.status(status.OK).json(recipe);
};

const getId = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.getId(id);
  
  if (recipe === null) {
    return res.status(status.NOT_FOUND).json({ message: 'recipe not found' });
  }
  return res.status(status.OK).json(recipe);
};

const validateEntries = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const valid = await recipeService.validationEntries(name, ingredients, preparation);

  if (!valid) {
    return next();
  }

  return res.status(status.BAD_REQUEST).json({ message: valid });
};

const updateRecipe = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const objectHelper = {
    name,
    ingredients, 
    preparation,
    id,
    userId,
  };

  const recipe = await recipeModel.update(objectHelper);
  return res.status(status.OK).json(recipe);
};

module.exports = { createRecipe, validateEntries, getAllRecipe, getId, updateRecipe };
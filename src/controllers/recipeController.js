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

const validateEntries = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const valid = await recipeService.validationEntries(name, ingredients, preparation);

  if (!valid) {
    return next();
  }

  return res.status(status.BAD_REQUEST).json({ message: valid });
};

module.exports = { createRecipe, validateEntries, getAllRecipe };
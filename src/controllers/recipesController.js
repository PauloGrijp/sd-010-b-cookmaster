const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');

const registerNewRecipe = async (req, res) => {
  const newRecipe = await recipesService.registerNewRecipe(req.body, req.user);
  if (!newRecipe.recipe) return res.status(400).json(newRecipe);
  return res.status(201).json(newRecipe);
};

const getAllRecipes = async (req, res) => {
  const allRecipes = await recipesModel.getAllRecipes();
  if (!allRecipes) return res.status(400).json('Fail to get recipes, try again.');
  return res.status(200).json(allRecipes);
};

module.exports = {
  registerNewRecipe,
  getAllRecipes,
};
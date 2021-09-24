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

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getRecipeById(id);
  if (!recipe.name) return res.status(404).json(recipe);
  return res.status(200).json(recipe);
};

const updateRecipeById = async (req, res) => {
  const { id } = req.params;
  // console.log(req.user);
  const targetRecipe = await recipesService.updateRecipeById(req.body, req.user, id);
  if (!targetRecipe.name) return res.status(401).json(targetRecipe);
  return res.status(200).json(targetRecipe);
};

module.exports = {
  registerNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
};
const service = require('../services/recipeService');
const model = require('../models/recipeModel');
const { checkRecipe } = require('../utils/validate');

async function createRecipe(req, res) {
  const recipe = await service.createRecipe(req.body, req.headers);
  return res.status(201).json({ recipe });
}

async function getAllRecipes(req, res) {
  const recipes = await model.getAllRecipes();
  return res.status(200).json(recipes);
}

async function getRecipe(req, res) {
  const { id } = req.params;
  const recipe = await model.getRecipe(id);
  checkRecipe(recipe);
  return res.status(200).json(recipe);
}

async function updateRecipe(req, res) {
  const result = await service.updateRecipe(req);
  return res.status(200).json(result);
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
};
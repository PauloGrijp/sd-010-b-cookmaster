const service = require('../services/recipeService');
const model = require('../models/recipeModel');

async function createRecipe(req, res) {
  const recipe = await service.createRecipe(req.body, req.headers);
  return res.status(201).json({ recipe });
}

async function getAllRecipes(req, res) {
  const recipes = await model.getAllRecipes();
  return res.status(200).json(recipes);
}

module.exports = {
  createRecipe,
  getAllRecipes,
};
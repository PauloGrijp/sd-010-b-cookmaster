const RecipesService = require('../services/recipesService');

const create = async (req, res) => {
  const recipeInput = req.body;
  const { _id } = req.user;

  const newRecipe = await RecipesService.create(recipeInput, _id);
  res.status(201).json(newRecipe);
};

const getAll = async (_req, res) => {
  const allRecipes = await RecipesService.getAll();
  res.status(200).json(allRecipes);
};

const getById = async (req, res) => {
  const recipeId = req.params;
  const recipeFound = await RecipesService.getById(recipeId);
  res.status(200).json(recipeFound);
};

module.exports = {
  create,
  getAll,
  getById,
};

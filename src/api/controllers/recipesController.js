const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const newRecipe = req.body;
  const { authorization } = req.headers;

  const { status, createdRecipe } = await recipesService.createRecipe(newRecipe, authorization);
  res.status(status).json({ recipe: createdRecipe });
};

const getAllRecipes = async (_req, res) => {
  const { status, recipes } = await recipesService.getAllRecipes();
  res.status(status).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { status, recipe } = await recipesService.getRecipeById(id);
  res.status(status).json(recipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};

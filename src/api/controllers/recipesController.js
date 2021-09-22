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

module.exports = {
  createRecipe,
  getAllRecipes,
};

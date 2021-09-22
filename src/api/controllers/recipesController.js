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

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;
  const { authorization } = req.headers;

  const { status, updatedRecipe } = await recipesService.updateRecipe(id, recipe, authorization);
  res.status(status).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const { status } = await recipesService.deleteRecipe(id, authorization);
  res.status(status).json();
};

const addRecipeImage = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const { status, addedRecipeImage } = await recipesService.addRecipeImage(id, authorization);
  res.status(status).json(addedRecipeImage);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addRecipeImage,
};

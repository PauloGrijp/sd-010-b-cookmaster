const RecipeService = require('../services/recipes.service');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const newRecipe = await RecipeService.createRecipe(name, ingredients, preparation, _id);
  return res.status(201).json(newRecipe);
};

const getAllRecipes = async (_req, res) => {
  const recipes = await RecipeService.getAllRecipes();
  return res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await RecipeService.getRecipeById(id);
  return res.status(200).json(result);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId, role } = req.user;
  const recipe = await RecipeService.getRecipeById(id);
  if (recipe.userId !== userId && role !== 'admin') {
    const error = new Error('unauthorized');
    error.code = 401;
    throw error;
  }

  const result = await RecipeService.updateRecipe(id, name, ingredients, preparation);
  console.log(result);
  return res.status(200).json(result);
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe };
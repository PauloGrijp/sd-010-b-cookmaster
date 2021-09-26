const RecipeService = require('../services/recipes.service');

const createRecipe = async (req, res) => {
  console.log(req.user);
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const newRecipe = await RecipeService.createRecipe(name, ingredients, preparation, _id);
  return res.status(201).json(newRecipe);
};

const getAllRecipes = async (_req, res) => {
  const recipes = await RecipeService.getAllRecipes();
  return res.status(200).json(recipes);
};

module.exports = { createRecipe, getAllRecipes };
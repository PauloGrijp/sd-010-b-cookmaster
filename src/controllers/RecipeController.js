const RecipeService = require('../services/RecipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await RecipeService.createRecipe(name, ingredients, preparation, _id);

  if (recipe.message) {
    return res.status(400).json({ message: recipe.message });
  }

  return res.status(201).json({ recipe });
};

const getRecipes = async (_req, res) => {
  const recipes = await RecipeService.getRecipes();
  return res.status(200).json(recipes);
};

module.exports = {
  createRecipe,
  getRecipes,
};
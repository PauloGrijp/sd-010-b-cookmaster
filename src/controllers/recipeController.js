const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  
  const { status, message } = await recipeService.createRecipe(
    { name, ingredients, preparation, user },
  );

  return res.status(status).json(message);
};

const getAllRecipes = async (_req, res) => {
  const { status, message } = await recipeService.getAllRecipes();

  return res.status(status).json(message);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
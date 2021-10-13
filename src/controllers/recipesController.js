const recipesService = require('../services/recipesService');

async function registeringRecipes(req, res) {
  const { name, ingredients, preparation } = req.body;
  const newRecipes = await recipesService.registeringRecipes(name, ingredients, preparation);

  if (newRecipes.err) {
    return res.status(newRecipes.err.status).json(newRecipes.err.message);
  }

  return res.status(201).json(newRecipes);
}

const getAllRecipes = async (_req, res) => {
  const allRecipes = await recipesService.getAllRecipes();

  return res.status(200).json(allRecipes);
};

const getRecipeId = async (req, res) => {
  const { id } = req.params;

  if (id.length < 24) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  const recipeId = await recipesService.getRecipeId(id);

  return res.status(200).json(recipeId);
};

module.exports = {
  registeringRecipes,
  getAllRecipes,
  getRecipeId,
};

const recipesService = require('../services/recipesService');

async function registeringRecipes(req, res) {
  const { name, ingredients, preparation } = req.body;
  const newRecipes = await recipesService.registeringRecipes(name, ingredients, preparation);

  if (newRecipes.err) {
    return res.status(newRecipes.err.status).json(newRecipes.err.message);
  }

  return res.status(201).json(newRecipes);
}

const getAllRecipes = async (req, res) => {
  const allRecipes = await recipesService.getAllRecipes();

  return res.status(200).json(allRecipes);
};

module.exports = {
  registeringRecipes,
  getAllRecipes,
};

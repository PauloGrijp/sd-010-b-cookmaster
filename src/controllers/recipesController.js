const recipesService = require('../services/recipesService');

const registerNewRecipe = async (req, res) => {
  const newRecipe = await recipesService.registerNewRecipe(req.body, req.user);
  if (!newRecipe.recipe) return res.status(400).json(newRecipe);
  return res.status(201).json(newRecipe);
};

module.exports = {
  registerNewRecipe,
};
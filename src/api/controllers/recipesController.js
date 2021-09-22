const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const newRecipe = req.body;
  const { authorization } = req.headers;

  const { status, createdRecipe } = await recipesService.createRecipe(newRecipe, authorization);
  res.status(status).json({ recipe: createdRecipe });
};

module.exports = {
  createRecipe,
};

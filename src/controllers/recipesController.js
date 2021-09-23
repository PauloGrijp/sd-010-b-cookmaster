const RecipesService = require('../services/recipesService');

const create = async (req, res) => {
  const recipeInput = req.body;
  const { users: { _id } } = req.user;

  const newRecipe = await RecipesService.create(recipeInput, _id);
  res.status(201).json(newRecipe);
};

module.exports = {
  create,
};

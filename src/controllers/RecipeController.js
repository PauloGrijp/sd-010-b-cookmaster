const RecipeModel = require('../services/RecipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await RecipeModel.createRecipe(name, ingredients, preparation, _id);

  if (recipe.message) {
    return res.status(400).json({ message: recipe.message });
  }

  return res.status(201).json({ recipe });
};

module.exports = {
  createRecipe,
};
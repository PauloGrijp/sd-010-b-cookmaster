const recipesValidations = require('../services/recipesValidations');

const createRecipesController = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const recipes = await recipesValidations.createRecipes({ name, ingredients, preparation });
  const { message, id } = recipes;
  if (message) {
    return res.status(400).json({ message });
  }
  return res.status(201).json({ recipe: { name, ingredients, preparation, userId, _id: id } });
};

module.exports = {
  createRecipesController,
};
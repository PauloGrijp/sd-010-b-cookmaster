const { addNewRecipe } = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;
  const result = await addNewRecipe(name, ingredients, preparation, userId);
  return res.status(201).json({ recipe: result });
};

module.exports = { createRecipe };
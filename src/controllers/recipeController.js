const { addNewRecipe, getRecipe } = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;
  const result = await addNewRecipe(name, ingredients, preparation, userId);
  return res.status(201).json({ recipe: result });
};

const allRecipes = async (req, res) => {  
  const result = await getRecipe();
  return res.status(200).json(result);
};

module.exports = { createRecipe, allRecipes };
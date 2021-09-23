const { addNewRecipe, getRecipe, getRecipeById } = require('../services/recipeService');

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

const getById = async (req, res) => {  
  const { id } = req.params;
  const { result } = await getRecipeById(id);
  if (!result) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(result);
};

module.exports = { createRecipe, allRecipes, getById };
const { addNewRecipe, getRecipe, 
  getRecipeById, deletedRecipe, editedRecipe } = require('../services/recipeService');

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

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await deletedRecipe(id);
  return res.status(204).json(result);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { name, ingredients, preparation } = req.body;
  const result = await editedRecipe(id, name, ingredients, preparation);
  return res.status(200).json({ ...result, userId });
};

module.exports = { createRecipe, allRecipes, getById, deleteRecipe, editRecipe };
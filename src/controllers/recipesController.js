const recipesService = require('../services/recipesService');

const verifyRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) { 
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
  }
  next();
};

const createRecipe = async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipeCreated = await recipesService.createRecipe({
     userId: _id, name, ingredients, preparation, 
    });
  return res.status(201).json({ recipe: recipeCreated });
};

const getAll = async (_req, res) => {
const allRecipes = await recipesService.getAll();
return res.status(200).json(allRecipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  if (!recipe) { return res.status(404).json({ message: 'recipe not found' }); }
  return res.status(200).json(recipe);
};

module.exports = {
  verifyRecipe,
  createRecipe,
  getAll,
  getById,
};
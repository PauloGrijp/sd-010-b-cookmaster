const Model = require('../models/recipes');

const WRONG_ID_FORMAT = (res) => res.status(404).json({
  message: 'recipe not found',
});

const getAll = async (_req, res) => {
  const allRecipes = await Model.getAll();
  console.log(allRecipes);
  return res.status(200).json(allRecipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipes = await Model.getById(id);
  if (!recipes) return WRONG_ID_FORMAT(res);
  return res.status(200).json(recipes);
};

const getRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
} 
  const id = req.user;
  const recipe = await Model.registerRecipes(name, ingredients, preparation, id);
  return res.status(201).json({ recipe });
};

module.exports = { 
  getRecipes,
  getAll,
  getById,
};
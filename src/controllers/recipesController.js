const recipesService = require('../services/recipesServices');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.payload;
  const userId = _id;
  const { err, recipe } = await recipesService
    .createRecipe(name, ingredients, preparation, userId);
  if (err) return res.status(err.status).json({ message: err.message });
  return res.status(201).json({ recipe });
};

const getAll = async (req, res) => {
  const recipes = await recipesService.getAll();
  return res.status(200).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(recipe);
};

module.exports = {
  create,
  getAll,
  getById,
};  

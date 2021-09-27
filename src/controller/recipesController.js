const recipesService = require('../services/recipesService');

const add = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;
    const { recipe } = await recipesService.add(name, ingredients, preparation, userId);
    return res.status(201).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAll = async (_req, res) => {
  try {
      const recipes = await recipesService.getAll();
      if (!recipes) return res.status(404).json({ message: 'Recipe not found' });
      return res.status(200).json(recipes);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getById({ id });
    if (recipe.message) {
      return res.status(404).json(recipe);
    }
  return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { add, getAll, getById };
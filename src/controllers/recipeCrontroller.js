const model = require('../models/recipeModel');
const service = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const { _id } = req.user;
  const createdRecipe = await model.create(name, ingredients, preparation, _id);
  
  return res.status(201).json(createdRecipe);
};

const getAllRecipes = async (_req, res) => {
  const recipes = await model.getAll();
  return res.status(200).json(recipes);
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await service.readRecipe(id);

    if (exists === null) {
      return res.status(404).json({ message: 'recipe not found' });
    }
    const recipe = await model.getOne(id);
    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(404).json({ message: 'recipe not found' });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
};

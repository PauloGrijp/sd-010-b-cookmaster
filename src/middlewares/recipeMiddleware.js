const { ObjectId } = require('mongodb');

const { validateRecipe } = require('../useCase/useCaseRecipe');
const { findById } = require('../models/recipeModel');

const isValidRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const { code, message } = await validateRecipe({ name, ingredients, preparation });

  if (message) return res.status(code).json({ message });

  next();
};

const existsRecipe = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(404).json({ message: 'recipe not found' });

  const { recipe } = await findById({ id });

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  next();
};

module.exports = {
  isValidRecipe,
  existsRecipe,
};
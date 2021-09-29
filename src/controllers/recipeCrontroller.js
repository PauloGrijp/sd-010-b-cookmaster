const model = require('../models/recipeModel');

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

module.exports = {
  createRecipe,
  getAllRecipes,
};

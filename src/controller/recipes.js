const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');
const modelsRecipes = require('../models/recipes');

const createRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
    const { _id } = req.user; 
    const newRecipe = await modelsRecipes
      .create(name, ingredients, preparation, _id);
    
    if (!name || !ingredients || !preparation) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid entries. Try again.'});
    }

    return res.status(StatusCodes.CREATED)
      .json(newRecipe);
});

const getAllRecipes = rescue(async (_req, res) => {
  const recipes = await modelsRecipes.getAll();

  return res.status(StatusCodes.OK).json(recipes);
});

module.exports = {
  createRecipe,
  getAllRecipes,
};

const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');
const controllerRecipes = require('../services/recipes');

const createRecipe = rescue(async (req, res) => {
  const { body: recipe } = req;
    const { _id: userId } = req.user; 
    const newRecipe = await controllerRecipes.createRecipe(recipe, userId);
    if (newRecipe.message) return res.status(StatusCodes.BAD_REQUEST).json(newRecipe);

    return res.status(StatusCodes.CREATED).json(newRecipe);
});

module.exports = {
  createRecipe,
};
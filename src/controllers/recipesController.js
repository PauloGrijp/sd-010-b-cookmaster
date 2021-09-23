const { StatusCodes } = require('http-status-codes');
const recipesService = require('../services/recipesServices');

const addRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;

    const recipeData = { name, ingredients, preparation, userId };
  
    const recipe = await recipesService.addRecipe(recipeData);
  
    return res.status(StatusCodes.CREATED).json(recipe);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await recipesService.getAllRecipes();
    
    if (!recipes) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Recipes not found' });
    
    return res.status(StatusCodes.OK).json(recipes);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

module.exports = { addRecipe, getAllRecipes };

const { StatusCodes } = require('http-status-codes');
const recipesService = require('../services/recipesServices');

const addRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.user;

    const recipeData = { name, ingredients, preparation, userId: id };
  
    const recipe = await recipesService.addRecipe(recipeData);
  
    return res.status(StatusCodes.CREATED).json(recipe);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await recipesService.getAllRecipes();
    
    if (!recipes) return res.status(StatusCodes.NOT_FOUND).json({ message: 'recipes not found' });
    
    return res.status(StatusCodes.OK).json(recipes);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
  
    const recipe = await recipesService.getRecipeById(id);

    if (!recipe) return res.status(StatusCodes.NOT_FOUND).json({ message: 'recipe not found' });
    
    return res.status(StatusCodes.OK).json(recipe);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

module.exports = { addRecipe, getAllRecipes, getRecipeById };

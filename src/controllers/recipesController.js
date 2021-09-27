const { StatusCodes } = require('http-status-codes');
const service = require('../services/recipesService');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const newRecipe = await service.createRecipe({ name, ingredients, preparation }, _id);
    if (!newRecipe) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
    }
    return res.status(StatusCodes.CREATED).json({
      recipe: {
        ...newRecipe,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const allRecipes = await service.getAllRecipes();
    return res.status(StatusCodes.OK).json(allRecipes);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Sorry! There is something wrong!' });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await service.getRecipeById(id);
    if (recipe === false) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'recipe not found' });
    }
    return res.status(StatusCodes.OK).json(recipe);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Sorry! There is something wrong!' });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};

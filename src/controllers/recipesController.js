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
        _id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await service.getAllRecipes();
    return res.status(StatusCodes.OK).json(allRecipes);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Sorry! There is something wrong!' });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
};

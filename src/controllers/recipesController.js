const { StatusCodes } = require('http-status-codes');
const path = require('path');
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

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const updatedRecipe = await service.updateRecipe({ name, ingredients, preparation }, _id, id);
    if (!updatedRecipe) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid entries. Try again.' });
    }
    return res.status(StatusCodes.OK).json({ ...updatedRecipe });
  } catch (error) {
    console.log(error);
  }
};

const updateImg = async (req, res) => {
  try {
    const { id } = req.params;
    const image = path.join('localhost:3000', 'src', 'uploads', `${id}.jpeg`);
    const recipeImg = await service.updateImg(id, image);
    return res.status(StatusCodes.OK).json(recipeImg);
  } catch (error) {
    console.log(error);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await service.deleteRecipe(id);
    if (!deletedRecipe) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  updateImg,
  deleteRecipe,
};

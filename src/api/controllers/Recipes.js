const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    OK,
  },
} = require('http-status-codes');
const Recipes = require('../services/Recipes');

const ERROR_MESSAGE = 'Something went wrong';

const createRecipe = async (req, res) => {
  try {
    const { body: recipe } = req;
    const { _id: userId } = req.user; 
    const newRecipe = await Recipes.createRecipe(recipe, userId);
    if (newRecipe.message) return res.status(BAD_REQUEST).json(newRecipe);

    return res.status(CREATED).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(ERROR_MESSAGE);
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await Recipes.getAllRecipes();

    return res.status(OK).json(recipes);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(ERROR_MESSAGE);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
};

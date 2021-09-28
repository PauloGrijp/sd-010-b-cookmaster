const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    OK,
    NOT_FOUND,
    UNAUTHORIZED,
    NO_CONTENT,
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

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipes.getRecipeById(id);

    if (recipe.message) return res.status(NOT_FOUND).json(recipe);

    return res.status(OK).json(recipe);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(ERROR_MESSAGE);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { body: recipeToBeUpdated, params: { id }, user } = req;
    const recipe = await Recipes.updateRecipe(recipeToBeUpdated, id, user);

    if (recipe.message) return res.status(UNAUTHORIZED).json(recipe);

    return res.status(OK).json(recipe);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(ERROR_MESSAGE);
  } 
};

const deleteRecipe = async (req, res) => {
  try {
    const { params: { id }, user } = req;
    const deletedRecipe = await Recipes.deleteRecipe(id, user);

    if (deletedRecipe.message) return res.status(UNAUTHORIZED).json(deletedRecipe);

    return res.status(NO_CONTENT).json();
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(ERROR_MESSAGE);
  } 
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};

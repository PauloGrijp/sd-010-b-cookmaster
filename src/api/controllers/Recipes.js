const { StatusCodes } = require('http-status-codes');

const Recipes = require('../services/Recipes');

const registerNewRecipe = async (req, res, next) => {
  const { _id } = req.user;
  const newRecipe = req.body;

  const addedRecipe = await Recipes.registerNewRecipe(newRecipe, _id);
  if (addedRecipe.isErrorMessage) {
    return next({
      codeError: addedRecipe.codeError,
      isErrorMessage: addedRecipe.isErrorMessage,
    });
  }

  res.status(StatusCodes.CREATED).json(addedRecipe);
};

const getAllRecipes = async (req, res, next) => {
  const allRecipes = await Recipes.getAllRecipes();
  if (allRecipes.isErrorMessage) return next({ isErrorMessage: allRecipes.isErrorMessage });

  res.status(StatusCodes.OK).json(allRecipes);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);
  if (recipe.isErrorMessage) {
    return next({
      codeError: recipe.codeError,
      isErrorMessage: recipe.isErrorMessage,
    });
  }

  res.status(StatusCodes.OK).json(recipe);
};

const editRecipeById = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const newDataRecipe = req.body;

  const editedRecipe = await Recipes.editRecipeById(id, user, newDataRecipe);
  if (editedRecipe.isErrorMessage) {
    return next({
      codeError: editedRecipe.codeError,
      isErrorMessage: editedRecipe.isErrorMessage,
    });
  }
  
  res.status(StatusCodes.OK).json(editedRecipe);
};

module.exports = {
  registerNewRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
};

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

module.exports = {
  registerNewRecipe,
};

const { StatusCodes } = require('http-status-codes');
const recipesService = require('../services/recipesService');

module.exports = async (req, _res, next) => {
  const { _id, role } = req.user;
  const { id } = req.params;
  try {
    const recipe = await recipesService.getRecipeById(id);
    if (recipe.err) return next(recipe);
    if (
      role !== 'admin'
      && !recipe.recipeById.userId.toString() === _id.toString()
    ) {
      return next({
        status: StatusCodes.NOT_FOUND,
        err: 'User without permission to change',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

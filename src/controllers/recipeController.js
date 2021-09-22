const { recipeService } = require('../services');
const { code, error } = require('../schema');

const createRecipe = async (req, res) => {
  try {
    const recipe = req.body;
    const payload = req.user;

    const { status, notification } = await recipeService.createRecipe(recipe, payload);

    return res.status(status).json(notification);
  } catch (e) {
    return res.status(code.HTTP_INTERNAL_SERVER_ERROR).json({ message: error.unexpectedError });
  }
};

const getRecipes = async (_req, res) => {
  try {
    const { status, notification } = await recipeService.getRecipes();

    return res.status(status).json(notification);
  } catch (e) {
    return res.status(code.HTTP_INTERNAL_SERVER_ERROR).json({ message: error.unexpectedError });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, notification } = await recipeService.getRecipeById(id);

    return res.status(status).json(notification);
  } catch (e) {
    return res.status(code.HTTP_INTERNAL_SERVER_ERROR).json({ message: error.unexpectedError });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
};

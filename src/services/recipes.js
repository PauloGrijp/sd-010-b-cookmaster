const models = require('../models/recipes');
const { validateInputs } = require('../validations/recipes');

const create = async (recipe, payload) => {
  const error = new Error();
  error.err = {
    code: 400,
    message: 'Invalid entries. Try again.',
  };

  const validInputs = validateInputs(recipe);
  if (validInputs === false) throw error;

  const newRecipe = await models.create(recipe, payload);
  return newRecipe;
};

const getAll = async () => {
  const allRecipes = await models.getAll();

  return allRecipes;
};

const getById = async (id) => {
  const recipe = await models.getById(id);

  return recipe;
};

const remove = async (id, userId, role) => {
  const error = new Error();
  error.err = {
    code: 401,
    message: 'missing auth token',
  };

  const recipeError = new Error();
  recipeError.err = {
    code: 404,
    message: 'recipe not found',
  };

  const recipe = await models.getById(id);

  if (!recipe) throw recipeError;

  if (userId === recipe.userId || role === 'admin') {
    const removedRecipe = await models.remove(id);

    return removedRecipe;
  }

  throw error;
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};

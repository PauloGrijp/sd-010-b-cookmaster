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

module.exports = {
  create,
  getAll,
  getById,
};

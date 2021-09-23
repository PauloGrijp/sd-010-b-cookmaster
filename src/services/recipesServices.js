const recipesModels = require('../models/recipesModels');
const { isValidID } = require('../middlewares/validations');
const { CODE_HTTP } = require('../helpers/responses');

const createRecipes = async ({ name, ingredients, preparation, userId }) => {
  const resultModel = await recipesModels.createRecipes({ name, ingredients, preparation, userId });
  return resultModel;
};

const getAll = async () => recipesModels.getAll();

const getById = async ({ id }) => {
  const idValid = isValidID(id);
  if (!idValid) return CODE_HTTP.NOT_FOUND;
  const resultModel = await recipesModels.getById({ id });
  return resultModel;
};
module.exports = {
  createRecipes,
  getAll,
  getById,
};
const model = require('../Models/Recipes');
const valid = require('../validations/recipes');

const getAll = () => model.getAll();

const getById = async (id) => {
  const result = await model.getById(id);
  valid.isRecipe(result);
  return result;
};

const newRecipe = async (name, ingredients, preparation, userId) => {
  valid.validateRecipeBody(name, ingredients, preparation);
  const result = await model.newRecipe(name, ingredients, preparation, userId);
  return result;
};

module.exports = {
  getAll,
  getById,
  newRecipe,
};

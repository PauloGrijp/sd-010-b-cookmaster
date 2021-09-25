const recipesModel = require('../model/recipesModel');

const blank = (value1, value2, value3) => (!value1 || !value2 || !value3);
const errorMessage = {
  message: 'Invalid entries. Try again.',
};
const validation = ({ name, ingredients, preparation }) => {
  switch (true) {
    case (blank(name, ingredients, preparation)): return errorMessage;
    default: return false;
  }
};

const create = async (recipe, id) => {
  const isNotValid = validation(recipe);
  if (isNotValid) { return isNotValid; }
  return recipesModel.create(recipe, id);
};

const getAll = async () => recipesModel.getAll();

module.exports = {
  create,
  getAll,
};
const ErrorRequest = require('../helpers/errorRequest');
const recipesModel = require('../models/recipesModel');

const isValidEntries = (entries) => {
  const entriesValues = Object.values(entries);
  const isTruthyValues = entriesValues.every((value) => value);
  return isTruthyValues;
};

const create = (reqBodyEntries) => {
  if (!isValidEntries(reqBodyEntries)) {
    throw new ErrorRequest('badRequest', 'Invalid entries. Try again.');
  }

  return recipesModel.create(reqBodyEntries);
};

const getById = async (id) => {
  try {
    const recipeFound = await recipesModel.getById(id);  
    return recipeFound;
  } catch (error) {
    throw new ErrorRequest('notFound', 'recipe not found');
  }
};

module.exports = {
  create,
  getById,
};
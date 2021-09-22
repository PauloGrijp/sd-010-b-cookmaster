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

module.exports = {
  create,
};
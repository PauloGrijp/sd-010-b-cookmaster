const { ObjectID } = require('mongodb');
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

const update = async (reqData) => {
  const updatedRecipe = await recipesModel.update(reqData);
  return updatedRecipe;
};

const putImage = async (reqData) => recipesModel.putImage(reqData);

module.exports = {
  create,
  getById,
  update,
  putImage,
};
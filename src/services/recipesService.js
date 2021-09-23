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

const getAll = () => recipesModel.getAll();

const getById = async (id) => {
  try {
    const recipeFound = await recipesModel.getById(id);  
    return recipeFound;
  } catch (error) {
    throw new ErrorRequest('notFound', 'recipe not found');
  }
};

const buildFilterQueryByRole = (filterData) => {
  const { id, userId, role } = filterData;
  switch (role) {
    case 'admin': return { _id: ObjectID(id) };
    default: return { $and: [{ _id: ObjectID(id) }, { userId }] };
  }
};

const update = async ({ id, userId, role }, newData = {}) => {
  const filterQuery = buildFilterQueryByRole({ id, userId, role });
  const updatedRecipe = await recipesModel.update(newData, filterQuery);
  return updatedRecipe;
};

const deleteById = async ({ id, userId, role }) => {
  const filterQuery = buildFilterQueryByRole({ id, userId, role });
  await recipesModel.deleteById(filterQuery);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  putImage,
};
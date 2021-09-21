const ErrorRequest = require('../helpers/errorRequest');
const usersModel = require('../models/usersModel');
const tokenService = require('./tokenService');

const validateEntries = (entries) => {
  const requestBodyValues = Object.values(entries);
  const isTruthyValues = requestBodyValues.every((value) => value);
  const emailRegex = /[a-z]+@[a-z]+\.com/;

  return (isTruthyValues && emailRegex.test(entries.email));
};

const existsBlanksValues = (entries) => {
  const requestBodyValues = Object.values(entries);
  const hasSomeBlankValues = requestBodyValues.some((value) => !value);
  return hasSomeBlankValues;
};

const create = async (reqBodyEntries) => {
  if (!validateEntries(reqBodyEntries)) {
    throw new ErrorRequest('badRequest', 'Invalid entries. Try again.');
  }
};

const createUser = async (reqBodyEntries) => {
  validateEntries(reqBodyEntries);
  await usersModel.existsEmail(reqBodyEntries.email);
  const userCreated = await usersModel.createUser(reqBodyEntries);
  return userCreated;
}; 

module.exports = {
  createUser,
};

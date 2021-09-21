const ErrorRequest = require('../helpers/errorRequest');
const usersModel = require('../models/usersModel');

const validateEntries = (entries) => {
  const requestBodyValues = Object.values(entries);
  const isTruthyValues = requestBodyValues.every((value) => value);
  const emailRegex = /[a-z]+@[a-z]+\.com/;

  if (!isTruthyValues || !emailRegex.test(entries.email)) {
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

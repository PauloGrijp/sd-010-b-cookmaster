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

  const registeredEmail = await usersModel.existsEmail(reqBodyEntries.email); 
  if (registeredEmail) throw new ErrorRequest('conflict', 'Email already registered');

  const userCreated = await usersModel.create(reqBodyEntries);
  return userCreated;
};

const authenticate = async (reqBodyEntries) => {
  if (existsBlanksValues(reqBodyEntries)) {
    throw new ErrorRequest('unauthorized', 'All fields must be filled');
  }

  const user = await usersModel.validUser(reqBodyEntries);
  if (!user) throw new ErrorRequest('unauthorized', 'Incorrect username or password');

  const tokenCreated = tokenService.createToken(user);
  return tokenCreated;
};

const createAdmin = async ({ name, email, password }, role) => {
  if (role !== 'admin') throw new ErrorRequest('forbidden', 'Only admins can register new admins');
  return usersModel.create({ name, email, password, role });
};

module.exports = {
  create,
  createAdmin,
  authenticate,
};

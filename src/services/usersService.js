const usersModel = require('../models/usersModel');

const {
  validEntries,
  emailExists,
} = require('../validations/usersValidation');

const error = (code, message) => ({ err: { code, message } });

const codes = {
  badRequest: 400,
  conflict: 409,
};

const { badRequest, conflict } = codes;

const messages = {
  invalidEntries: 'Invalid entries. Try again.',
  emailConflict: 'Email already registered',
};

const { invalidEntries, emailConflict } = messages;

const createUser = async (name, email, password) => {
  if (!validEntries(name, email, password)) return error(badRequest, invalidEntries);
  if (await emailExists(email)) return error(conflict, emailConflict);
  return usersModel.createUser(name, email, password);
};

module.exports = {
  createUser,
};
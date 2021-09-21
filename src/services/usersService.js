const usersModel = require('../models/usersModel');

const {
  validEntries,
  emailExists,
  validLogin,
} = require('../validations/usersValidation');

const error = (code, message) => ({ err: { code, message } });

const codes = {
  badRequest: 400,
  conflict: 409,
  unauthorized: 401,
};

const { badRequest, conflict, unauthorized } = codes;

const messages = {
  invalidEntries: 'Invalid entries. Try again.',
  emailConflict: 'Email already registered',
  allFieldsFilled: 'All fields must be filled',
  incorrectUsrPsw: 'Incorrect username or password',
};

const { invalidEntries, emailConflict, allFieldsFilled, incorrectUsrPsw } = messages;

const createUser = async (name, email, password) => {
  if (!validEntries(name, email, password)) {
    return Promise.reject(error(badRequest, invalidEntries));
  }
  if (await emailExists(email)) return Promise.reject(error(conflict, emailConflict));
  return usersModel.createUser(name, email, password);
};

const login = async (email, password) => {
if (!validLogin(email, password)) return Promise.reject(error(unauthorized, allFieldsFilled));

const user = await usersModel.getUserByEmail(email);
if (!user || user.password !== password) {
  return Promise.reject(error(unauthorized, incorrectUsrPsw));
}

return user;
};

module.exports = {
  createUser,
  login,
};
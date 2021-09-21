const model = require('../models/userModel');

const errors = {
  invalidEntries: 'Invalid entries. Try again.',
  existingEmail: 'Email already registered',
  loginMissingField: 'All fields must be filled',
  incorrectLogin: 'Incorrect username or password',
};

const invalidEntryStatus = 400;
const existingEmailStatus = 409;
const badLoginStatus = 401;

const isString = (value) => typeof value === 'string';
const validateEmailFormat = (email) => {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRe.test(email);
};

const emailExistsInDb = async (email) => {
  const userData = await model.findByEmail(email);
  try {
    if (userData.name) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const validateInputType = (name, email, password) => (
  isString(email) && isString(name) && isString(password)
);

const validateLoginInput = async (email, password) => {
  if (email === undefined || password === undefined) {
    return { status: badLoginStatus, err: { message: errors.loginMissingField } };
  }
  if (!validateEmailFormat(email) || !(await emailExistsInDb(email))) {
    return { status: badLoginStatus, err: { message: errors.incorrectLogin } };
  }
  return {};
};

const validateLogin = async (email, password) => {
  const userData = await model.findByEmail(email);
  if (userData.password !== password) {
    return { status: badLoginStatus, err: { message: errors.incorrectLogin } };
  }
  return userData;
};

const validateCreateUser = async (name, email, password) => {
  switch (true) {
    case (!validateInputType(email, name, password)):
      return { status: invalidEntryStatus, err: { message: errors.invalidEntries } };
    case (!validateEmailFormat(email)):
        return { status: invalidEntryStatus, err: { message: errors.invalidEntries } };
    case (await emailExistsInDb(email)):
      return { status: existingEmailStatus, err: { message: errors.existingEmail } };
    default: return {};
  }
};

module.exports = {
  validateCreateUser,
  validateLoginInput,
  validateLogin,
};
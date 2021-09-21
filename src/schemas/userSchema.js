const model = require('../models/userModel');

const errors = {
  invalidEntries: 'Invalid entries. Try again.',
  existingEmail: 'Email already registered',
};

const invalidEntryStatus = 400;
const existingEmailStatus = 409;

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

const validateImputType = (name, email, password) => (
  isString(email) && isString(name) && isString(password)
);

const validateNameEmailAndPassword = async (name, email, password) => {
  switch (true) {
    case (!validateImputType(email, name, password)):
      return { status: invalidEntryStatus, err: { message: errors.invalidEntries } };
    case (!validateEmailFormat(email)):
        return { status: invalidEntryStatus, err: { message: errors.invalidEntries } };
    case (await emailExistsInDb(email)):
      return { status: existingEmailStatus, err: { message: errors.existingEmail } };
    default: return {};
  }
};

module.exports = {
  validateNameEmailAndPassword,
};
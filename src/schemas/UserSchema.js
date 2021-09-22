const UserModel = require('../models/usersModel');

const codes = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
};

const errors = {
  FIELD_BLANK: 'Invalid entries. Try again.',
  ALREADY_REGISTERED: 'Email already registered',
};

const invalidEntries = { code: codes.BAD_REQUEST, message: errors.FIELD_BLANK };
const repeatedEmail = { code: codes.CONFLICT, message: errors.ALREADY_REGISTERED };

const blank = ({ name, email, password }) => (!name || !email || !password);

const invalid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  return !regex.test(email);
};

const alreadyExists = async (email) => UserModel.findByEmail(email);

const validate = async ({ name, email, password }) => {
  switch (true) {
    case blank({ name, email, password }): return invalidEntries;
    case invalid(email): return invalidEntries;
    case await alreadyExists(email): return repeatedEmail;
    default: return false;
  }
};

module.exports = {
  validate,
};

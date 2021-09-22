const ERROR = { message: 'Ops, an error occurred with your request' };

const INVALID_ENTRY = { message: 'Invalid entries. Try again.' };

const EMAIL_ALREADY_EXISTS = { message: 'Email already registered' };

const MUST_BE_FILLED = { message: 'All fields must be filled' };

const INCORRECT_DATA = { message: 'Incorrect username or password' };

const INVALID_TOKEN = { message: 'jwt malformed' };

module.exports = {
  ERROR,
  INVALID_ENTRY,
  EMAIL_ALREADY_EXISTS,
  MUST_BE_FILLED,
  INCORRECT_DATA,
  INVALID_TOKEN,
};
const { validateCredentials } = require('./utils/validateCredentials');

const userModel = require('../models/users');

const invalidEntries = 'Invalid entries. Try again.';
const emailRegistered = 'Email already registered';

const createUser = async (name, email, password) => {
  const { error: validationError } = validateCredentials({
    name,
    email,
    password,
  });
  if (validationError) return { message: invalidEntries };

  const userAlreadyExist = await userModel.findUser(email);
  if (userAlreadyExist) return { message: emailRegistered };

  return userModel.createUser(name, email, password);
};

module.exports = {
  createUser,
};

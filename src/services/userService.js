const userModel = require('../models/userModel');

const createUserError = { message: 'Invalid entries. Try again.' };

const validateNewUser = async ({ name, password, email }) => {
  const validateEmail = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  if (!name) return createUserError;
  if (!password) return createUserError;
  if (!email || !validateEmail.test(email)) return createUserError;

  return 'SUCCESS';
};

const getUserByEmail = async ({ email }) => {
  const existsUser = await userModel.getUserByEmail(email);
  return existsUser;
};

const createUser = async (newUser) => {
  const validationResult = await validateNewUser(newUser);
  if (validationResult !== 'SUCCESS') return validationResult;

  const usersFound = await getUserByEmail(newUser);
  if (usersFound.length > 0) {
    createUserError.message = 'Email already registered';
    return createUserError;
  }

  const createdUser = await userModel.createUser(newUser);
  return createdUser;
};

module.exports = { createUser };

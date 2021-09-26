const usersModel = require('../models/usersModel');
const usersValidation = require('../validation/usersValidation');

const getUser = async (userEmail) => {
  const userFound = await usersModel.getUser(userEmail);

  if (!userFound) {
    return {
      error: {
        status: 404,
        message: 'User not found',
      },
    };
  }

  return { user: { ...userFound } };
};

const createUser = async (userData) => {
  const newUser = userData;
  const { email, name, password } = newUser;
  const emailValid = usersValidation.validateEmail(email);
  const nameValid = usersValidation.validateName(name);
  const passwordValid = usersValidation.validatePassword(password);

  if (!emailValid || !nameValid || !passwordValid) {
    return { message: 'Invalid entries. Try again.' };
  }

  newUser.role = 'user';

  const user = await usersModel.createUser(newUser);

  return {
    user: {
      ...user,
    },
  };
};

module.exports = {
  getUser,
  createUser,
};
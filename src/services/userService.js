const { getUserByEmail,
  createUser, getAll } = require('../models/userModel');

const { errorBusiness } = require('../middlewares/errors');

const createServiceUser = async (name, email, password) => {
  const emailIsExists = await getUserByEmail(email);
  const emailIsValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

  if (emailIsExists) {
    return errorBusiness('Email already registered');
  }
  
  if (!emailIsValid.test(email)) {
    return errorBusiness('Invalid entries. Try again.');
  }

  const userCreated = await createUser(name, email, password);

  return userCreated;
};

module.exports = { createServiceUser, getAll, getUserByEmail };
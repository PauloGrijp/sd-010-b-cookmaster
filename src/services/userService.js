const { getUserByEmail, createUser } = require('../models/userModel');

const { errorBusiness } = require('../middlewares/errors');

const createServiceUser = async (name, email, password, role) => {
  const emailIsExists = await getUserByEmail(email);
  const emailIsValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

  if (emailIsExists) {
    return errorBusiness('Email already registered');
  }

  if (!emailIsValid.test(email)) {
    return errorBusiness('Invalid entries. Try again.');
  }

  const userCreated = await createUser(name, email, password, role);

  return userCreated;
};

module.exports = {
  createServiceUser,
};
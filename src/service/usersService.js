const { createUser, getByEmail } = require('../model/usersModel');
const { errorBusiness, errorEmail } = require('../middleware/estructError');

const create = async (user) => {
  const { email } = user;
  const emailIsValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
  if (!emailIsValid.test(email)) {
    return errorBusiness('Invalid entries. Try again.');
  }
  const existEmail = await getByEmail(email);
  if (existEmail) {
    return errorEmail('Email already registered');
  }
  const resultCreateUser = await createUser(user);
  return resultCreateUser;
};

module.exports = { create, createUser };

const userModel = require('../models/userModel');

const ifExist = (array) => array.every((entrie) => entrie);

const isValid = (email) => ((/\S+@\S+\.\S+/).test(email));

const createUser = async ({ name, email, password }) => {
  const userExist = await userModel.userExists(email);
  if (userExist) return { erro: { code: 409, message: 'Email already registered' } };

  const ifExists = ifExist([name, email, password]);
  if (!ifExists) return { erro: { code: 400, message: 'Invalid entries. Try again.' } };

  const validateEmail = isValid(email);
  if (!validateEmail) return { erro: { code: 400, message: 'Invalid entries. Try again.' } };

  return userModel.create({ name, email, password });
};

module.exports = { createUser };
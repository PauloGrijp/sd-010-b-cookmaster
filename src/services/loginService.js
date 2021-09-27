const loginModel = require('../models/loginModel');

const ifExist = (array) => array.every((entrie) => entrie);

const validations = async ({ email, password }) => {
  const ifExists = ifExist([email, password]);
  if (!ifExists) return { erro: { code: 401, message: 'All fields must be filled' } };

  const userExist = await loginModel.userExists(email);
  if (!userExist || userExist.password !== password) {
    return { erro: { code: 401, message: 'Incorrect username or password' } };
  }

  return userExist;
};

module.exports = { validations };
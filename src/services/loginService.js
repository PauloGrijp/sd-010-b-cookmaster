const LoginModel = require('../models/loginModel');

const invalidInputs = { code: 401, message: 'Incorrect username or password' };

const findUser = async (login) => {
  const { email, password } = login;
  const userFound = await LoginModel.findUser(email);

  if (!userFound || userFound.password !== password) return invalidInputs;

  return userFound;
};

module.exports = {
  findUser,
};

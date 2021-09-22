const LoginModel = require('../models/loginModel');

const findUser = async (login) => {
  const { email, password } = login;
  const userFound = await LoginModel.findUser(email);

  if (!userFound || userFound.password !== password) return null;

  return userFound;
};

module.exports = {
  findUser,
};

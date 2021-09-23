const LoginModel = require('../models/loginModel');

const invalidEmail = { code: 401, message: 'Incorrect username or password' };

const findUser = async (login) => {
  const { email, password } = login;
  const emailFound = await LoginModel.findUser(email);
  console.log(emailFound);

  if (!emailFound) return invalidEmail;
  // if (!userFound || userFound.password !== password) return null;

  return emailFound;
};

module.exports = {
  findUser,
};

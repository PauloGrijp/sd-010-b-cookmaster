const loginModel = require('../models/loginModel');

const verifyEmailandPassword = (email, password) => {
  if (!email || !password) { return null; }
  return true;
};

const validateEmail = (email) => {
  const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  if (!emailRegex.test(email)) {
    return null;
  }
  return true;
};

const findUser = async (loginData) => {
  const { password } = loginData;
  const userFound = await loginModel.findUser(loginData);
  if (!userFound || userFound.password !== password) { return null; }
  return userFound;
};

module.exports = {
  verifyEmailandPassword,
  validateEmail, 
  findUser,
};
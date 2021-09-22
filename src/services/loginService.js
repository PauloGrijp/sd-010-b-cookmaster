const loginModel = require('../model/loginModel');

const incorrectInformation = { message: 'Incorrect username or password' };

const login = async (email, password) => {
  const user = await loginModel.userLogin(email);
  if (user && user.email === email && user.password === password) return user;
  return incorrectInformation;
};
module.exports = { login };
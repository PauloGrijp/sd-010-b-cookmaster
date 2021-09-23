const loginService = require('../models/loginModel');

const loginUser = async (email, password) => {
  const user = await loginService.loginUser(email, password).catch((err) => console.log(err));
  return user;
};
module.exports = { loginUser };
const loginModel = require('../models/loginModel');

const userLogin = async (email, password) => {
  const user = await loginModel.findUser(email);

  if (user && user.email === email && user.password === password) return user;

  return { message: 'Incorrect username or password' };
};

module.exports = { userLogin };

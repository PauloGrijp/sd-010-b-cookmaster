const LoginModel = require('../models/LoginModel');

const UNAUTHORIZED = 401;

const login = async ({ email, password }) => {
  const response = await LoginModel.login({ email, password });
  if (!response) return UNAUTHORIZED;
  return response;
};

module.exports = {
  login,
};
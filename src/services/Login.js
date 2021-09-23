const JWT = require('jsonwebtoken');

const Login = require('../models/Login');
const { UNAUTHORIZED } = require('../utils/statusCodes');

const KEYWORD = 'SECRET';

const login = async (email, password) => {
  const user = await Login.login(email, password);

  if (!user) return { code: UNAUTHORIZED, message: 'Incorrect username or password' };

  const { _id } = user;

  const token = JWT.sign(
    {
      _id,
      email: user.email,
      role: user.role,
    },
    KEYWORD,
  );

  return { token };
};

module.exports = {
  login,
}; 
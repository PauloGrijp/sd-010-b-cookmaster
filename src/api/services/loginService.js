const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const { ERROR_EMPTY_FIELDS, ERROR_INVALID_DATA } = require('./msgErrors');

const secret = 'minhaSenhaCookmaster';
const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const validateEmail = (email) => {
  if (!email) { throw ERROR_EMPTY_FIELDS; }

  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const Email = regex.test(email);
  if (!Email) { throw ERROR_INVALID_DATA; }
};

const validatePwd = (user, password) => {
  if (!password || !password.length) { throw ERROR_EMPTY_FIELDS; }
  if (!user || user.password !== password) { throw ERROR_INVALID_DATA; }
};

const login = async (email, password) => {
  validateEmail(email);
  const createdUser = await usersModel.getUserByEmail(email);
  validatePwd(createdUser, password);
  delete createdUser.name;
  delete createdUser.password;
  const token = jwt.sign({ data: createdUser }, secret, jwtConfig);

  return {
    status: 200,
    token,
  };
};

module.exports = {
  login,
};

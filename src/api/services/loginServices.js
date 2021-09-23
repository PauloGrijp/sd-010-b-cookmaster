const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const privateKey = 'passsecret';
const jwtConfig = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

const BAD_CREDENTIAL_NULL = {
  status: 401,
  message: 'All fields must be filled',
};

const BAD_INVALID_CREDENTIAL = {
  status: 401,
  message: 'Incorrect username or password',
};

const validCredentialsNull = (email, password) => {
  if (!email || !password) throw BAD_CREDENTIAL_NULL;
};

const validCredentialExists = (user, password) => {
  if ((!user || !password) || user.password !== password) {
   throw BAD_INVALID_CREDENTIAL;
  }
};

const loginUser = async (email, password) => {
  validCredentialsNull(email, password);
  const user = await userModel.userByEmail(email);
  validCredentialExists(user, password);
  delete user.password;
  delete user.name;
  const token = jwt.sign(user, privateKey, jwtConfig);
  return { token };
};

module.exports = {
  loginUser,
};
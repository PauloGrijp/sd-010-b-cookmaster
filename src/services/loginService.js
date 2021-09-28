const jwt = require('jsonwebtoken');
const { loginModel } = require('../models');
const { code, verifyLogin } = require('../schema');

const secret = 'cookmasterprojecttoken';
const jwtConfig = {
  expiresIn: '4h',
  algorithm: 'HS256',
};
/**
 * 
 * @param { object } user email, password
 * @returns { promise }
 */
const getUser = async (user) => {
  const returnDataBase = await loginModel.getUser(user);

  const validation = verifyLogin.checkUser(user, returnDataBase);

  if (validation.notification) return validation;
  
  const { _id, email, role } = returnDataBase;

  const jwtToken = jwt.sign({ data: { _id, email, role } }, secret, jwtConfig);

  const result = {
    status: code.HTTP_OK_STATUS,
    notification: {
      token: jwtToken,
    },
  };

  return result;
};

module.exports = {
  getUser,
};

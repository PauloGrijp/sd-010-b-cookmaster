const jwt = require('jsonwebtoken');
const AppError = require('../errorHandler/AppError');
const { loginModel } = require('../models');
const httpCodes = require('../constants/httpCodes.json');
const ajv = require('../schemas/validation');
const errorMessages = require('../constants/errorMessages.json');

const secret = 'N[c>zL-+$@AbXBw';

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const loginUserSvc = async (user) => {
  const validate = ajv.getSchema('login');
  const isValid = validate(user);
  if (isValid) {
    const userLogged = await loginModel.loginUser(user);
    if (userLogged && userLogged.password === user.password) {
      const { password: _, ...userWithOutPassword } = userLogged;
      const token = jwt.sign({ data: userWithOutPassword }, secret, jwtConfig);
      return token;
    }
    throw new AppError(httpCodes.HTTP_UNAUTHORIZED, errorMessages.INCORRECT_AUTH);
  }
  throw new AppError(httpCodes.HTTP_UNAUTHORIZED, validate.errors[0].message);
};

module.exports = {
  loginUserSvc,
  secret,
};

const AppError = require('../errorHandler/AppError');
const httpCodes = require('../constants/httpCodes.json');
const { usersModel } = require('../models');
const ajv = require('../schemas/validation');

exports.createUserSvc = async (user) => {
  const validate = ajv.getSchema('users');
  const isValid = validate(user);
  if (isValid) return usersModel.createUser({ ...user, role: 'user' });
  throw new AppError(httpCodes.HTTP_BAD_REQUEST, validate.errors[0].message);
};

exports.createAdminSvc = async (user) => {
  const validate = ajv.getSchema('users');
  const isValid = validate(user);
  if (isValid) return usersModel.createUser({ ...user, role: 'admin' });
  throw new AppError(httpCodes.HTTP_BAD_REQUEST, validate.errors[0].message);
};
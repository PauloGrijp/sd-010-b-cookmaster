const UserModel = require('../models/UserModel');
const { validateEmail } = require('../middlewares/validations');

const BAD_REQUEST = 400;
const HTTP_CONFLICT = 409;

const createUser = async ({ name, email, password }) => {

  const isEmailValid = validateEmail(email);
  if (!isEmailValid) return BAD_REQUEST;

  const emailAlreadyExists = await UserModel.findByEmail(email);
  if (emailAlreadyExists) return HTTP_CONFLICT; 

  const response = await UserModel.createUser({ name, email, password });
  return response;
};

module.exports = {
  createUser,
}
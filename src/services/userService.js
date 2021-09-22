const userSchema = require('../schemas/userSchema');
const userModel = require('../models/userModel');

const errorMessage = (code, message) => ({ err: { code, message } });

const codesHttpErrors = {
  HTTP_BAD_REQUEST: 400,
  HTTP_CONFLICT: 409,
};

const messages = {
  invalidEntries: 'Invalid entries. Try again.',
  emailRegistered: 'Email already registered',
};

const validateUserInfo = (data) => {
  const { error } = userSchema.validate(data);

  if (error) { return false; }
  return true;
};

const validateEmail = async (email) => {
  const userEmail = await userModel.getByEmail(email);
  if (userEmail) { return true; }

  return false;
};

const created = async (data) => {
  if (!validateUserInfo(data)) { 
    return errorMessage(codesHttpErrors.HTTP_BAD_REQUEST, messages.invalidEntries);
  }

  if (await validateEmail(data.email)) {
    return errorMessage(codesHttpErrors.HTTP_CONFLICT, messages.emailRegistered);
  }

  const result = await userModel.create(data);
  return result;
};

module.exports = {
  validateUserInfo,
  validateEmail,
  created,
};
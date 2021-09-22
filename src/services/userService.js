const userModel = require('../models/userModel');

const userSchema = require('../schemas/userSchema');
const loginSchema = require('../schemas/loginSchema');

const errorMessage = (code, message) => ({ err: { code, message } });

const codesHttpErrors = {
  HTTP_BAD_REQUEST: 400,
  HTTP_CONFLICT: 409,
  HTTP_UNAUTHORIZED: 401,
};

const messages = {
  invalidEntries: 'Invalid entries. Try again.',
  emailRegistered: 'Email already registered',
  allFieldsFilled: 'All fields must be filled',
  incorrectDataFields: 'Incorrect username or password',
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

// -------------------------- REQUISITO 2 ---------------------------

const validateLogin = (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) { return false; }
  return true;
};

const login = async (email, password) => {
  if (!validateLogin(email, password)) {
    return Promise.reject(
      errorMessage(codesHttpErrors.HTTP_UNAUTHORIZED, messages.allFieldsFilled),
    );
  }
  const user = await userModel.getByEmail(email);
  if (!user || user.password !== password) {
    return Promise.reject(
      errorMessage(codesHttpErrors.HTTP_UNAUTHORIZED, messages.incorrectDataFields),
    );
  }
  
  return user;
};

module.exports = {
  validateUserInfo,
  validateEmail,
  created,
  validateLogin,
  login,
};
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const secret = 'eg$xeRMV9TL#K!HaqepGiE8!';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const emptyFieldsError = {
  message: 'All fields must be filled',
};

const authenticationError = {
  message: 'Incorrect username or password',
};

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const verifyEmail = (email) => {
  const emailRegexTest = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g).test(email);
  if (!emailRegexTest) {
    return authenticationError;
  }
  return false;
};

const validateLogin = async (info) => {
  const { email, password } = info;
  const { error } = loginSchema.validate(info);
  const userSearched = await usersModel.getUserByEmail(email);
  const emailNotIsValid = verifyEmail(email);
  const registeredPassword = userSearched.password;
  const { _id, role } = userSearched;
  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
  
  if (error) return emptyFieldsError;
  if (emailNotIsValid) return emailNotIsValid;
  if (userSearched === false) return authenticationError;
  if (password !== registeredPassword) return authenticationError;
  return { token };
};

module.exports = {
  validateLogin,
};
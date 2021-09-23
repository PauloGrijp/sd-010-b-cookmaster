const Joi = require('joi');
const usersModel = require('../models/usersModel');

const invalidEntriesError = {
  message: 'Invalid entries. Try again.',
};

const emailAlreadyExistsError = {
  message: 'Email already registered',
};

const verifyEmailExists = async (email) => {
  const userAlreadyExists = await usersModel.userExists(email);
  if (userAlreadyExists) {
    return emailAlreadyExistsError;
  }
  return false;
};

const verifyEmail = (email) => {
  const emailRegexTest = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g).test(email);
  if (!emailRegexTest) {
    return invalidEntriesError;
  }
  return false;
};

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const registerNewUser = async (info) => {
  const { email } = info;
  const { error } = userSchema.validate(info);
  const emailAlreadyExists = await verifyEmailExists(email);
  const emailNotIsValid = verifyEmail(email);
  
  if (error) return invalidEntriesError;
  if (emailNotIsValid) return emailNotIsValid; 
  if (emailAlreadyExists) return emailAlreadyExists;
  return usersModel.registerNewUser(info); 
};

module.exports = {
  registerNewUser,
};
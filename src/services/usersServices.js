const Joi = require('joi');
const UsersModel = require('../models/usersModel');

const validateUser = async (name, email, password) => {
  const { error } = Joi.object({
     email: Joi.string().email().required(),
     name: Joi.string().required(), 
     password: Joi.string().required(),
    }).validate({ email, name, password });
    if (error) return error;
    return false;
};

const verifyEmail = async (email) => {
  const uniqueEmail = await UsersModel.findByEmail(email);
  return uniqueEmail;
};

const registerUsers = async (email, password, name) => {
  console.log(email);
  const validate = await validateUser(name, email, password);
  if (validate) {
 return {
  status: 400,
   message: 'Invalid entries. Try again.',
 };
}
  const uniqueEmail = await verifyEmail(email);
  console.log(uniqueEmail);
  if (uniqueEmail) {
 return {
   status: 409,
    message: 'Email already registered',
  }; 
}
  const register = await UsersModel.registerUsers(name, email, password);
  return register;
};

module.exports = { registerUsers };
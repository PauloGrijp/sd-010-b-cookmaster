const Joi = require('joi');
const UsersModel = require('../models/usersModel');

const validateUser = async (email, password, name) => {
  const { error } = Joi.object({
     email: Joi.string().email().required(),
     name: Joi.string().required(), 
     password: Joi.string().required(),
    }).validate({ email, name, password });
    if (error) return error;
    return false;
};

const fieldObrigatory = async (email, password) => {
  const { error } = Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().required(),
    }).validate({ email, password });
    if (error) {
      return {
       status: 401,
        message: 'All fields must be filled',
      };
     }
    return false;
};

const verifyEmail = async (email) => {
  const uniqueEmail = await UsersModel.findByEmail(email);
  return uniqueEmail;
};

const registerUsers = async (email, password, name) => {
  const validate = await validateUser(email, password, name);
  if (validate) {
 return {
  status: 400,
   message: 'Invalid entries. Try again.',
 };
}
  const uniqueEmail = await verifyEmail(email);
  if (uniqueEmail) {
 return {
   status: 409,
    message: 'Email already registered',
  }; 
}
  const register = await UsersModel.registerUsers(name, email, password);
  return register;
};

const loginUser = async (email, password) => {
  const validate = await fieldObrigatory(email, password);
  if (validate) return validate;
  const checkLogin = await UsersModel.checkLogin(email, password);
  if (!checkLogin) {
    return { 
      status: 401,  
      message: 'Incorrect username or password',
    };
  }
  return checkLogin;
};

const registerAdmin = async (email, password, name, role) => {
  if (role !== 'admin') {
    return {
      status: 403,
      message: 'Only admins can register new admins',
    };
  }
  const uniqueEmail = await UsersModel.registerAdmin(email, password, name);
  return uniqueEmail;
};

module.exports = { 
  registerUsers,
  loginUser,
  registerAdmin,

};
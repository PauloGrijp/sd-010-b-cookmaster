const model = require('../models/userModel');

// create user

const validateUserName = async (name) => {
  try {
    if (name) {
      return true;
    }
    throw new Error('Invalid entries. Try again.');
  } catch (err) {
    return { message: err.message };
  }
};

const validateEmail = async (email) => {
  const reg = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const regexvalidation = reg.test(email);
  const verifyRegistredEmail = await model.getByEmail(email);
  try {
    if (verifyRegistredEmail) {
      throw new Error('Email already registered');
    }
    if (email && regexvalidation) {
      return true;
    }
    throw new Error('Invalid entries. Try again.');
  } catch (err) {
    return { message: err.message };
  }
};

const validatePassword = async (password) => {
  try {
    if (password) {
      return true;
    }
    throw new Error('Invalid entries. Try again.');
  } catch (err) {
    return { message: err.message };
  }
};

const createUser = async (name, email, password) => {
  const user = await model.create(name, email, password, 'user');
  return user;
};

// user login

const validateLogin = async (email, password) => {
  if (!email || !password) {
    return { message: 'All fields must be filled' };
  }
};

const checkUserExists = async (email, password) => {
  const verifyRegistredEmail = await model.getByEmail(email);
  if (!verifyRegistredEmail) {
    return 'incorrect';
  } 
  if (verifyRegistredEmail.password !== password) {
     return 'incorrect'; 
  }
};

module.exports = { 
  validateUserName,
  validateEmail,
  validatePassword,
  createUser,
  validateLogin,
  checkUserExists,
};

const joi = require('joi');
const usersModel = require('../model/usersModel');

const validCreateUser = (email, password, name) => {
  const { error } = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  }).validate({ email, password, name });
  if (error) throw error;
};
const checkEmailExist = async (email) => {
  const emailUser = await usersModel.checkEmailM(email);
  if (emailUser) {
    const error = new Error('Email already registered');
    error.code = 409;
    throw error;
  }
};
const validLoginUser = (email, password) => {
  if (!email || !password) {
    const error = new Error('All fields must be filled');
    error.code = 401;
    throw error;
  }
};
const checkLoginUser = (user) => {
  if (!user) {
    const error = new Error('Incorrect username or password');
    error.code = 401;
    throw error;
  }
};

module.exports = {
  validCreateUser,
  checkEmailExist,
  validLoginUser,
  checkLoginUser,
};

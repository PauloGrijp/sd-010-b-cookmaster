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
    error.status = 409;
    throw error;
  }
};

module.exports = {
  validCreateUser,
  checkEmailExist,
};

const Joi = require('joi');
const JWT = require('jsonwebtoken');
const model = require('../models/users');

const secret = 'mia';
const options = {
  algorithm: 'HS256',
  expiresIn: '34m',
};

function userValidation(name, email, password) {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });
  if (error) throw error;
}
async function emailValidation(email) {
  const user = await model.findUser(email);
  if (user) {
    const error = new Error('Email already registered');
    error.code = 409;
    throw error;
  }
}
async function newUser(name, email, password, role) {
  userValidation(name, email, password);
  await emailValidation(email);
  const { password: _, ...result } = await model.newUser(name, email, password, role);
  return result;
}

async function login(email, password) {
  if (!email || !password) {
    const error = new Error('All fields must be filled');
    error.code = 401;
    throw error;
  }
  const result = await model.findUser(email, password);
  if (!result) {
    const error = new Error('Incorrect username or password');
    error.code = 401;
    throw error;
  }
  const { password: _, ...payload } = result;
  const token = JWT.sign(payload, secret, options);
  return token;
}

module.exports = {
  newUser,
  login,
};
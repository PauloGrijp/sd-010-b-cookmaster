const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const usersModel = require('../models/usersModel');

const SECRET = 'secretexample';

const jwtConfig = {
  expiresIn: '6000m',
  algorithm: 'HS256',
};

const schemaValidateUser = Joi.object({
  name: Joi.string()
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required(),
});

const schemaValidateLogin = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required(),
});

const create = async ({ name, email, password }) => {
  const validateCreate = schemaValidateUser.validate({ name, email, password });
  if (validateCreate.error) {
    return {
      status: StatusCodes.BAD_REQUEST, err: 'Invalid entries. Try again.',
  };
}
  const existsUser = await usersModel.findUser(email);
  if (existsUser) {
    return {
      status: StatusCodes.CONFLICT, err: 'Email already registered',
    };
  }
  const user = await usersModel.create(name, email, password);
  const { password: _, ...userWithoutPassword } = user;
  return {
    status: StatusCodes.CREATED, user: userWithoutPassword,
  };
};

const findUserCreateToken = async (email, password) => {
  const validateFind = schemaValidateLogin.validate({ email, password });
  if (validateFind.error) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      err: 'All fields must be filled',
    };
  }
  const user = await usersModel.findUser(email);
  if (!user || user.password !== password) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      err: 'Incorrect username or password',
    };
  }
  const { password: _, ...userWithoutPassword } = user;
  const token = jwt.sign(userWithoutPassword, SECRET, jwtConfig);
  return { status: StatusCodes.OK, token };
};
module.exports = { 
  create,
  findUserCreateToken,
};
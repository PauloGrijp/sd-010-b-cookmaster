const status = require('http-status');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const userService = require('../services/userService');

// JWT //
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
//    //

const entryValidated = async (req, res, next) => {
  const { name, email, password } = req.body;

  const valid = await userService.validationEntries(name, email, password);

  if (!valid) {
    req.email = { email };
    return next();
  }

  return res.status(status.BAD_REQUEST).json({ message: valid });
};

const emailValidated = async (req, res, next) => {
  const { email } = req.email;

  const valid = await userService.validationEmail(email);

  if (!valid) {
    return next();
  }

  return res.status(status.CONFLICT).json({ message: valid });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.add(name, email, password);

  return res.status(status.CREATED).json(user);
};

const validateEmailPassword = async (req, res, next) => {
  const { email, password } = req.body;

  const valid = await userService.validationEmailPassword(email, password);

  if (!valid) {
    return next();
  }

  return res.status(status.BAD_REQUEST).json({ message: valid });
};

const getUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.getUser(email, password);

  if (!user) {
    return res.status(status.NOT_FOUND).json({ message: 'Not found' });
  }
  const { _id } = user;
  console.log(user, _id);
  const userData = {
    id: _id,
    email: user.email,
    role: user.role,
  };

  const secretKey = 'senha-secreta';
  
  const token = jwt.sign({ data: userData }, secretKey, jwtConfig);
  console.log(user);
  return res.status(status.OK).json({ token });
};

module.exports = { entryValidated, getUser, validateEmailPassword, emailValidated, createUser };
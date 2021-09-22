const status = require('http-status');
const userModel = require('../models/userModel');
const userService = require('../services/userService');

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

module.exports = { entryValidated, emailValidated, createUser };
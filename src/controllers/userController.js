const service = require('../services/userService');

const validateUserName = async (req, res, next) => {
  const { name } = req.body;
  const response = await service.validateUserName(name);
  if (response !== true) {
    return res.status(400).json(response);
  }
next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const response = await service.validateEmail(email);
  if (response !== true) {
    if (response.message.includes('Invalid')) {
      return res.status(400).json(response);
    } if (response.message.includes('Email')) {
      return res.status(409).json(response);
    }
  }
next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  const response = await service.validatePassword(password);
  if (response !== true) {
    return res.status(400).json(response);
  }
next();
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const response = await service.createUser(name, email, password);
  return res.status(201).json(response);
};

module.exports = { validateUserName, validateEmail, validatePassword, createUser };

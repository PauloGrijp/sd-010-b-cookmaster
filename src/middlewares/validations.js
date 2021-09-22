const { StatusCodes } = require('http-status-codes');
const model = require('../models/usersModel');

const error = 'Invalid entries. Try again.';

const validateFields = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const regEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  if (!regEmail.test(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
  next();
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await model.emailExists(email);
  if (user) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};

module.exports = {
  validateFields,
  validateEmail,
  emailExists,
};

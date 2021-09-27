const user = require('../models/userModel');

const nameValidation = (req, _res, next) => {
  const data = req.body;
  if (!data.name) {
    return next({
      status: 400,
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const emailValidation = async (req, _res, next) => {
  const data = req.body;
  const emailCheck = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!data.email || !emailCheck.test(data.email)) {
    return next({
      status: 400,
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const emailCheckExistis = async (req, _res, next) => {
  try {
    const result = await user.getUserByEmail('email', req.body.email);
    if (result) {
      return next({
        status: 409,
        message: 'Email already registered',
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: error.message,
    });
  }
  next();
};

const passwordValidation = (req, _res, next) => {
  if (!req.body.password) {
    return next({
      status: 400,
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const checkRole = (req, _res, next) => {
  const data = req.body;
  if (!data.role) {
    req.body.role = 'user';
  }
  next();
};

module.exports = {
  nameValidation,
  emailValidation,
  emailCheckExistis,
  passwordValidation,
  checkRole,
};

const status = require('./status');
const user = require('../models/userModel');
const nameValidation = (req, _res, next) => {
  const data = req.body;
  if(!data.name) return next({
    status: status.INVALID,
    message: status.INVALID_M,
  });
  next();
};

const emailValidation = async (req, _res, next) => {
  const data = req.body;
  const emailCheck = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if(!data.email || !emailCheck.test(data.email)) return next({
    status: status.INVALID,
    message: status.INVALID_M,
  });  
  next();
};

const emailCheckExistis = async (req, _res, next) => {
  try {
    const result = await user.getUserByEmail('email', req.body.email);
    if(result) return next({
      status: status.NOTUNIQUE,
      message: status.NOTUNIQUE_M,
    });
  } catch (error) {
    next({
      status: status.ERRO,
      message: error.message,
    });
  }
  next();
};

const passwordValidation = (req, _res, next) => {
  if(!req.body.password) return next({
    status: status.INVALID,
    message: status.INVALID_M,
  });
  next();
};

const checkRole = (req, _res, next) => {
  const data = req.body;
  if(!data.role) req.body.role = 'user';
  next();
};

module.exports = {
  nameValidation,
  emailValidation,
  emailCheckExistis,
  passwordValidation,
  checkRole,
}
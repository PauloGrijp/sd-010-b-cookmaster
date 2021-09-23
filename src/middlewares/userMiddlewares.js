const { badRequest, conflict } = require('../error/errorUsers');
const Users = require('../models/usersModel');

const checkName = (req, res, next) => {
  const { name } = req.body; 
  if (!name) {
    badRequest(res);
  }
  next();
};

const checkPasword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    badRequest(res);
  }
  next();
};

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const userEmail = await Users.findEmail(email);
  const regex = /\S+@\S+\.\S+/;
  
  if (!regex.test(email)) {
    badRequest(res);
  }

  if (userEmail) {
    conflict(res);
  }
  next();
};

module.exports = {
  checkName,
  checkPasword,
  checkEmail,
};
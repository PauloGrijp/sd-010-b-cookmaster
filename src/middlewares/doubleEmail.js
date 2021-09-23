const { usersModel } = require('../models');

module.exports = async (req, _res, next) => {
  const { email } = req.body;
  if (await usersModel.findEmail(email)) { 
    return next({ status: 409, message: 'Email already registered' }); 
  }
  return next();
};

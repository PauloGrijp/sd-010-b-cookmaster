const { userModel } = require('../models');

module.exports = async (req, _res, next) => {
  const { email } = req.body;
  if (await userModel.findEmail(email)) { 
    return next({ status: 409, message: 'Email already registered' }); 
  }
  return next();
};

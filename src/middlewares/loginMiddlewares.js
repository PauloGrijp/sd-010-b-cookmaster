const { unauthorized, unauthorizedEmailPassword } = require('../error/errorUsers');
const Users = require('../models/usersModel');

const checkLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const userEmail = await Users.findEmail(email);
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email) || !password) {
    unauthorizedEmailPassword(res);
  }
  if (!userEmail || userEmail.password !== password) {
    unauthorized(res);
  }
  next();
};

module.exports = {
  checkLogin,
};
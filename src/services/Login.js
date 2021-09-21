const Users = require('../models/Users');
const Error = require('../utils/createObjError');

const verify = async (email, password) => {
  const err = Error.unauthorized('Incorrect username or password');
  const checkLogin = await Users.findByEmail(email);
  if (!checkLogin || checkLogin.password !== password) return err;
  return checkLogin;
};

module.exports = {
  verify,
};

const Users = require('../models/usersModel');
const Error = require('../helpers/errors');

const findUser = async (email, password) => {
  const checkEmail = await Users.findEmail(email);
  if (!checkEmail || checkEmail.password !== password) {
    return Error.unauthorized('Incorrect username or password');
  }
  return checkEmail; 
};

module.exports = {
  findUser,
};
const loginModel = require('../models/loginModel');

function validateFields(password, email) {
  if (!password || !email) return false;

  return true;
}

function validateEmail(email) {
  const validator = /[A-Za-z0-9_.]+@[a-zA-Z_]+?\.[a-zA-Z_.]{2,7}$/;
  if (!validator.test(email)) return false;

   return true;
}

async function validatePassword(email, password) {
  const user = await loginModel.getUserEmail(email);
  if (!user || user.password !== password) return false;

  return user;
}

module.exports = {
  validateFields,
  validateEmail,
  validatePassword,
};

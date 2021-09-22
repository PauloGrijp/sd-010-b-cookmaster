const usersModel = require('../models/usersModel');

function validateFields(name, password, email) {
  const validator = /[A-Za-z0-9_.]+@[a-zA-Z_]+?\.[a-zA-Z_.]{2,7}$/;
  if (!name || !password || !email || !validator.test(email)) return false;

  return true;
}

async function validateEmail(email) {
  const userEmail = await usersModel.getUserEmail(email);

  if (userEmail) return false;

  return true;
}

async function createUser({ name, email, password }) {
  const userEmail = await usersModel.createUser({ name, email, password });

  return userEmail;
}

module.exports = {
  validateFields,
  validateEmail,
  createUser,
};
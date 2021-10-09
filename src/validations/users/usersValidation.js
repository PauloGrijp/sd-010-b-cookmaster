const usersModel = require('../../models/usersModel');

function validateEmailRegex(email) {
  const regex = /\S+@\S+\.\S+/;
  
  const isValid = regex.test(email);
  if (!isValid) return true;
}

function validateBody({ name, email, password }) {
  if (!name || !email || !password) return true;
}

async function validateEmailExists(email) {
  const getEmail = await usersModel.getByEmail(email);
  return getEmail;
}

async function validateCreate({ name, email, password }) {
  const emailRegex = validateEmailRegex(email);
  const body = validateBody({ name, email, password });
  const emailExists = await validateEmailExists(email);
  
  if (emailRegex || body) return 'missing values';
  if (emailExists) return 'email exists';
}

async function validateLogin({ email, password }) {
  const checkLogin = await usersModel.checkLogin({ email, password });
  
  if (!email || !password) return 'missing fields';
  if (!checkLogin) return 'wrong data';
}

module.exports = {
  validateCreate,
  validateLogin,
};
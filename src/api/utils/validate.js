const userModel = require('../models/userModel')

const err = {
  status: 400,
  message: 'Invalid entries. Try again.',
};
const err2 = {
  status: 401,
  message: 'All fields must be filled',
};

const err3 = {
  status: 401,
  message: 'Incorrect username or password',
};

function validName(name) {
  if (!name) throw err;
}
  
function validPassword(password) {
  if (!password) throw err;
}

function validEmail(email) {
  const re = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);
  if (!re) throw err;  
}

async function emailExists(email) {
  const result = await userModel.emailExists(email);
  return result;
}

function validCredentials(email, password) {
  if (!email || !password) throw err2;
}

function checkCredentials(user, password) {
  if (!user || user.password !== password) throw err3;
}

module.exports = {
  checkCredentials,
  validCredentials,
  validName,
  validPassword,
  validEmail,
  emailExists,
};

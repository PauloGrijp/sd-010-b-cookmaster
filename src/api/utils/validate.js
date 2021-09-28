const userModel = require('../models/userModel')

const err = {
  status: 400,
  message: 'Invalid entries. Try again.',
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

module.exports = {
  validName,
  validPassword,
  validEmail,
  emailExists,
};

const model = require('../models/userModel');
const { validName, validEmail, validPassword, emailExists } = require('../utils/validate');

const err = {
  status: 409,
  message: 'Email already registered',
};

async function create(body) {
  const { name, email, password } = body;
  validName(name);
  validEmail(email);
  validPassword(password);
  const emailReg = await emailExists(email);

  if (emailReg) throw err;

  const result = await model.create(body);
  return result;
}

module.exports = {
  create,
};
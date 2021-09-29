const modelUser = require('../../models/modelUsers');
const {
  LOGIN_NOT_FILLED,
  LOGIN_INCORRECT,
} = require('../errosCode/errosMessage');

const err = (statusCode) => ({ statusCode });

const loginEmail = (email) => {
  if (!email || typeof email !== 'string') throw err(LOGIN_NOT_FILLED);
};

const loginPassword = (password) => {
  if (!password || typeof password !== 'string') throw err(LOGIN_NOT_FILLED);
};

const loginConfirmUser = async (email, password) => {
  const response = await modelUser.getByEmail(email);
  if (!response) throw err(LOGIN_INCORRECT);

  const confirm = response.password === password;
  if (!confirm) throw err(LOGIN_INCORRECT);
};

module.exports = {
  loginEmail,
  loginPassword,
  loginConfirmUser,
};

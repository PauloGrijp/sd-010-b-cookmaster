const modelUser = require('../../models/modelUsers');

const {
  INVALID_ENTRIES,
  EMAIL_REGISTRED } = require('../errosCode/errosMessage');

const err = (statusCode) => ({ statusCode });

const userName = (name) => {
  if (!name || typeof name !== 'string') throw err(INVALID_ENTRIES);
};

const userPassword = (password) => {
  if (!password || typeof password !== 'string') throw err(INVALID_ENTRIES);
};

const userEmail = (email) => {
  if (!email || typeof email !== 'string') throw err(INVALID_ENTRIES);
};

const userEmailIsValid = (email) => {
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!validEmail) throw err(INVALID_ENTRIES);
};

const userEmailAlreadyExist = async (email) => {
  const response = await modelUser.getByEmail(email);
  if (response) throw err(EMAIL_REGISTRED);
};

module.exports = {
  userName,
  userPassword,
  userEmail,
  userEmailIsValid,
  userEmailAlreadyExist,
};

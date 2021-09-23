const modelUser = require('../models/modelUsers');

const err = (statusCode) => ({ statusCode });

const INVALID_ENTRIES = 'invalidEntries';
const EMAIL_REGISTRED = 'emailRegistred';
// const LOGIN_NOT_FILLED = 'loginNotFilled';
const LOGIN_INCORRECT = 'loginIncorrect';

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

const loginEmailPassword = (email, password) => {
  if (!email || typeof email !== 'string') throw err(INVALID_ENTRIES);
  if (!password || typeof password !== 'string') throw err(INVALID_ENTRIES);
};

const loginConfirmUser = async (email, password) => {
  const response = await modelUser.getByEmail(email);
  const confirm = response.password === password;
  if (!response || !confirm) throw err(LOGIN_INCORRECT);
};

module.exports = {
  userName,
  userPassword,
  userEmail,
  userEmailIsValid,
  userEmailAlreadyExist,
  loginEmailPassword,
  loginConfirmUser, 
};

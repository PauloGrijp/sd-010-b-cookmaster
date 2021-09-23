const modelUser = require('../models/modelUsers');

const err = (code) => ({ code });

const INVALID_ENTRIES = 'invalidEntries';
const EMAIL_REGISTRED = 'emailRegistred';

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

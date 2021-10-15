const { findUserByEmail, createUser } = require('../models/usersModel');

const validEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validPassword = (password) => {
  if (!password || typeof password !== 'string') return false;
};

const validName = (name) => {
  if (!name || typeof name !== 'string') return false;
};

const inValidUserData = (email, name, password) => {
  if (!validEmail(email) || !validName(name) || !validPassword(password)) return true;
};

const emailAlreadyRegistered = async (email) => {
  const alreadyRegistered = await findUserByEmail(email);
  if (alreadyRegistered) return true;
};

const createNewUser = (email, name, password) => createUser(email, name, password);

module.exports = {
  inValidUserData,
  emailAlreadyRegistered,
  createNewUser,
};

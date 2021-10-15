const { findUserByEmail, createUser } = require('../models/usersModel');

const validEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validString = (word) => {
  if (word && typeof word === 'string') return true;
};
const inValidUserData = (name, email, password) => {
  if (!validEmail(email) || !validString(name) || !validString(password)) return true;
};

const emailAlreadyRegistered = async (email) => {
  const alreadyRegistered = await findUserByEmail(email);
  if (alreadyRegistered) return true;
};

const createNewUser = (name, email, password, role) => createUser(name, email, password, role);

module.exports = {
  inValidUserData,
  emailAlreadyRegistered,
  createNewUser,
  validString,
};

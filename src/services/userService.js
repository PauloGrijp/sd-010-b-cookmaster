const { findUserByEmail, create } = require('../models/userModel');

const userIsValid = (name, email, password) => {
  if (!name || !email || !password) return false;

  return email.match(/^[\w.]+@[\w]+(.[\w]+)+$/);
};
const createUser = async ({ name, email, password }) => {
  const user = await findUserByEmail(email);

  if (!userIsValid(name, email, password)) return 'invalid entry';

  if (user) return 'user exists';

  return create(name, email, password);
};

module.exports = {
  createUser,
};
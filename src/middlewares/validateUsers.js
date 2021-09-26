const modelsUsers = require('../models/users');

const errors = {
  invalid: 'Invalid entries. Try again.',
  success: 'Email already registered',
};

const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const invalidEntries = async (user) => {
  const { name, email, password } = user;
  if (!name || !email || !password) return { message: errors.invalid };
  if (!emailRegEx.test(email)) return { message: errors.invalid };

  return {};
};

const emailAlreadyRegistered = async (user) => {
  const { email } = user;
  const result = await modelsUsers.emailAlreadyExists(email);
  if (result) return { conflict: true, message: errors.success };

  return {};
};

module.exports = {
  invalidEntries,
  emailAlreadyRegistered,
};

const { findByEmail } = require('../models/userModel');

const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const noHaveCase = (name, email, password) => !name || !email || !password;

const validateUser = async ({ name, email, password }) => {
  const code = 400;
  const message = 'Invalid entries. Try again.';

  if (noHaveCase(name, email, password)) return { code, message };
  if (await findByEmail({ email })) return { code: 409, message: 'Email already registered' };
  if (!emailIsValid(email)) return { code, message };
  return {};
};

module.exports = {
  validateUser,
};
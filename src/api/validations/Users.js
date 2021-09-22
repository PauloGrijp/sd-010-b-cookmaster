const { emailAlreadyExists } = require('../models/Users');

const errors = {
  invalidEntries: 'Invalid entries. Try again.',
  alreadyRegisteredEmail: 'Email already registered.',
};

const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const invalidEntries = (name, email, password) => {
  if (!name || !email || !password) return { message: errors.invalidEntries };
  if (!emailRegEx.test(email)) return { message: errors.invalidEntries };
};

const emailAlreadyRegistered = async (email) => {
  const alreadyRegistered = await emailAlreadyExists(email);
  if (alreadyRegistered) return { conflict: true, message: errors.alreadyRegisteredEmail };
};

module.exports = {
  invalidEntries,
  emailAlreadyRegistered,
};

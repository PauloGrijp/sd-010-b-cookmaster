const userModel = require('../models/Users');

const validateEntries = (name, email, password) => {
  if (!name || !email || !password || !email.match(/\S+@\S+\.\S+/)) {
    return { isError: true, message: 'Invalid entries. Try again.' };
  }
};

const createUser = async ({ name, email, password }) => {
  const checkEntries = validateEntries(name, email, password);
  if (checkEntries) return checkEntries;

  if (await userModel.findByEmail(email)) {
    return { emailError: true, message: 'Email already registered' };
  }

  const user = await userModel.create({ name, email, password });
  return user;
};

module.exports = {
  createUser,
};

// source https://ui.dev/validate-email-address-javascript/
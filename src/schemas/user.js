const { findMail } = require('../models/createUser');

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const empty = (email) => regex.test(email);
const cogito = (name, email, passwd) => !name || !email || !passwd;

const validation = async ({ name, email, passwd }) => {
  const code = 400;
  const message = 'Invalid entries. Try again.';

  if (cogito(name, email, passwd)) return { code, message };
  if (await findMail({ email })) return { code: 409, message: 'Email already registered' };
  if (!empty(email)) return { code, message };
  return {};
};

module.exports = {
  validation,
};

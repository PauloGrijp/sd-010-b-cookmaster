const userModel = require('../models/user');

const invalidEntries = { message: 'Invalid entries. Try again.' };
const existentEmail = { message: 'Email already registered' };

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const userValidation = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) { return res.status(400).json(invalidEntries); }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email.match(EMAIL_REGEX)) { return res.status(400).json(invalidEntries); }
  const userEmail = await userModel.findEmail(email);
  if (userEmail && userEmail.email === email) return res.status(409).json(existentEmail);
  next();
};

module.exports = { userValidation, validateEmail };

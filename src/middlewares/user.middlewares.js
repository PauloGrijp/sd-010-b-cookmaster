const { getUserByEmail } = require('../models/user.model');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

const isValidNameAndPassword = (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const isValidEmail = async (req, res, next) => {
  const { email } = req.body;

  const emailExists = await getUserByEmail(email);
  const regexForEmail = /\S+@\S+\.\S+/;
  const isValidEmailRegex = regexForEmail.test(email);

  if (!email || !isValidEmailRegex) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  if (emailExists) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = {
  isValidNameAndPassword,
  isValidEmail,
  validateLogin,
};
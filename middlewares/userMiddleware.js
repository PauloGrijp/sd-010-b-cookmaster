const userModel = require('../models/userModel');

const validateNameAndPassword = (req, res, next) => {
  const { name, password } = req.body;
  
  if (!name || !password) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  const re = /\S+@\S+\.\S+/;
  const isEmailValid = re.test(email);

  const emailExists = await userModel.getUserByEmail(email);

  if (!email || !isEmailValid) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  if (emailExists) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

module.exports = {
  validateNameAndPassword,
  validateEmail,
  validateLogin,
};
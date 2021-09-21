const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/userModel');

const secret = 'seusecretdetoken';
const tokenPattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

const verifyEmail = (email) => {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return email.match(pattern);
};

const validateUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);

  if (user) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

const validateUserData = (req, res, next) => {
  const { email, name, password } = req.body;

  if (!name || !email || !verifyEmail(email) || !password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateCredentials = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

const validateUserInDB = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  req.user = user;

  next();
};

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  if (!authorization.match(tokenPattern)) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  next();
};

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const decoded = jwt.verify(authorization, secret);

    const user = await getUserByEmail(decoded.email);

    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const checkRecipe = (req, res, next) => {
  const { name, preparation, ingredients } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = {
  validateUser,
  validateUserData,
  validateCredentials,
  validateUserInDB,
  validateToken,
  checkRecipe,
  verifyToken,
};

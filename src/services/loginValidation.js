const userModel = require('../models/user');

const invalidEntries = { message: 'Invalid entries. Try again.' };
// const existentEmail = { message: 'Email already registered' };
const accessDenied = { message: 'Incorrect username or password' };

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const userLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
      return res.status(401).json({ message: 'All fields must be filled' }); 
  }
  if (!email.match(EMAIL_REGEX)) { return res.status(400).json(invalidEntries); }
  next();
};

const validatePwd = async (req, res, next) => {
  const { email, password } = req.body;
  const userData = await userModel.findEmail(email);
  if (!userData || (userData && userData.email === email && userData.password !== password)) { 
    return res.status(401).json(accessDenied); 
  }
  next();
};

module.exports = { userLogin, validatePwd };
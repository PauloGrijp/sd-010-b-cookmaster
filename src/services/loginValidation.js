const userModel = require('../models/user');

const invalidEntries = { message: 'Invalid entries. Try again.' };
const accessDenied = { message: 'Incorrect username or password' };
const allFieldsMustbeField = { message: 'All fields must be filled' };

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const userLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
      return res.status(401).json(allFieldsMustbeField); 
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
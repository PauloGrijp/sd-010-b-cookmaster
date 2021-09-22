const userModel = require('../models/user');
const codes = require('../httpcodes');
const validateEmail = require('./emailRegex');

const missingFields = { message: 'All fields must be filled' };
const incorrectFields = { message: 'Incorrect username or password' };

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(codes.unhautorized).json(missingFields);
  if (!validateEmail(email)) return res.status(codes.unhautorized).json(incorrectFields);

  const registeredEmail = await userModel.checkEmail(email);
  if (!registeredEmail) return res.status(codes.unhautorized).json(incorrectFields);

  next();
};

const codes = require('../../httpcodes');
const userModel = require('../models/user');

const verifyUserCreationData = require('../util/verifyUserCreationData');
const emailRegex = require('../util/emailRegex');

const invaldEntries = { message: 'Invalid entries. Try again.' };
const alreadyRegistered = { message: 'Email already registered' };

module.exports = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!verifyUserCreationData(name, email, password)) {
    return res.status(codes.badRequest).json(invaldEntries);
  }

  if (!emailRegex(email)) return res.status(codes.badRequest).json(invaldEntries);

  const duplicatedEmail = await userModel.checkEmail(email);

  if (duplicatedEmail) return res.status(codes.conflict).json(alreadyRegistered);

  next();
};

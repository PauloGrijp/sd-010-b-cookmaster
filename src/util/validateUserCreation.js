const codes = require('../httpcodes');

const verifyUserCreationData = require('./verifyUserCreationData');
const emailRegex = require('./emailRegex');

const invaldEntries = 'Invalid entries. Try again.';

module.exports = async (name, email, password) => {
  if (!verifyUserCreationData(name, email, password)) {
    return { error: { code: codes.badRequest, message: invaldEntries } };
  }

  if (!emailRegex(email)) return { error: { code: codes.badRequest, message: invaldEntries } };

  return false;
};

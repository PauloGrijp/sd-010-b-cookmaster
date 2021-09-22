const { invalidEntries, emailAlreadyRegistered } = require('../validations/Users');
const Users = require('../models/Users');

const createUser = async (name, email, password) => {
  const isValidData = invalidEntries(name, email, password);
  if (isValidData.message) return isValidData;

  const alreadyRegistered = await emailAlreadyRegistered(email);
  if (alreadyRegistered.message) return alreadyRegistered;

  return Users.createUser(name, email, password);
};

module.exports = {
  createUser,
};

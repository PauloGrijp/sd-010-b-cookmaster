const validates = require('../middlewares/validateUsers');
const modelsUsers = require('../models/users');

const createUser = async (name, email, password) => {
  const isValidData = validates.invalidEntries(name, email, password);

  if (isValidData.message) return isValidData;

  const emailExist = await validates.emailAlreadyRegistered(email);
  
  if (emailExist.conflict) return emailExist;

  return modelsUsers.createUser(name, email, password);
};

module.exports = {
  createUser,
};

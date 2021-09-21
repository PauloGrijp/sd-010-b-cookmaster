const userModels = require('../models/userModels');

const createUserValidations = async (name, email, password, role) => {
  const createUser = await userModels.creatUser({ name, email, password, role });
  return createUser;
};

module.exports = {
  createUserValidations,
};
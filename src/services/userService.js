const model = require('../models/userModel');
const schema = require('../schemas/userSchema');

const createNewUser = async (name, email, password) => {
  const validation = await schema.validateNameEmailAndPassword(name, email, password);
  if (validation.err) return validation;
  const createdUser = await model.createNewUser(name, email, password);
  return createdUser;
};

module.exports = {
  createNewUser,
};

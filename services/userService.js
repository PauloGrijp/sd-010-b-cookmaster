const UsersModel = require('../models/userModel');

const validateFields = (name, email, password) => {
  if (!name || !email || !password) return false;
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) return false;

  return true;
};

const createUser = async ({ name, email, password }) => {
  const emailExists = await UsersModel.emailExists(email);
  const validation = validateFields(name, email, password);

  if (emailExists) return null;
  if (!validation) return false;

  return UsersModel.create({ name, email, password });
};

module.exports = {
  createUser,
};
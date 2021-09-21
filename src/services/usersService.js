const model = require('../models/usersModel');

const createUser = async ({ name, email, password, role, id }) => {
  const user = await model.createUser({ name, email, password, role, id });
  return user;
};

module.exports = {
  createUser,
};

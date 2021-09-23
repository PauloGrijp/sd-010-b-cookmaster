const usersModel = require('../models/usersModel');

const createUser = async (name, email, password) => {
  const checkEmailExist = await usersModel.findUserByEmail(email);
  if (checkEmailExist) {
    return { message: 'Email already registered',
  code: 409 };
  }
   const create = await usersModel.createUser(name, email, password);
  return create;
};

module.exports = {
  createUser,
};
const usersModel = require('../models/usersModel');
const usersValidation = require('../validations/users/usersValidation');

async function login({ email, password }) {
  const invalidUser = await usersValidation.validateLogin({ email, password });
  if (invalidUser) return invalidUser;
  const user = await usersModel.checkLogin({ email, password });
  return user;
}

async function create({ name, email, password }) {
  const invalidCreate = await usersValidation.validateCreate({
    name,
    email,
    password,
  });
  if (invalidCreate) return invalidCreate;

  const user = await usersModel.create({ name, email, password });
  return user;
}

async function newAdmin({ email, password, name, role }) {
  if (role !== 'admin') {
    return {
      status: 403,
      message: 'Only admins can register new admins',
    };
  }
  const registeredAdmin = await usersModel.newAdmin({ email, password, name });
  return registeredAdmin;
}

module.exports = {
  create,
  login,
  newAdmin,
};

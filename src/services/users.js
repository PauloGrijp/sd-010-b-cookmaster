const UserModel = require('../models/users');

// Methods
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S/;
  if (re.test(email) === true) return email;
  return false;
};

const exists = ({ name, email, password }) => {
  const data = [name, email, password];
  return data.every((el) => el);
};

// CRUD

// const findById = async (id)

const create = async (userData) => {
  if (exists(userData) !== true) return { err: 'invalid entries' };

  if (validateEmail(userData.email) === false) return { err: 'invalid entries' };
  
  const emailRegister = await UserModel.emailAlreadyExists(userData.email);
  if (emailRegister) return false;

  const user = await UserModel.create(userData);
  return { user: user.ops[0] };
};

module.exports = {
  create,
};

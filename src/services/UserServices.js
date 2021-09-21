const UserModel = require('../models/UserModel');

const message = 'Invalid entries. Try again';

const requiredFields = (name, email, password) => {
  if (!name || !email || !password) {
    return false;
  }
  return true;
};

const isValidEmail = (email) => {
  const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  if (!regexEmail.test(email)) {
    return false;
  }
  return true;
};

const createUser = async (name, email, password) => {
  const fieldValid = requiredFields(name, email, password);
  const emailValid = isValidEmail(email);
  if (!fieldValid || !emailValid) {
    return {
      message,
      status: 400,
    };
  }
  const user = await UserModel.findByEmail({ email });
  if (user) {
    return {
      message: 'Email already exists',
      status: 400,
    };
  }
  const newUser = await UserModel.create({ name, email, password });
  return {
    message: 'User created successfully',
    status: 201,
    data: newUser,
  };

};


module.exports = {
  createUser,
};
const UserModel = require('../models/UserModel');

const message = 'Invalid entries. Try again.';

const requiredFields = (name, email, password) => {
  if (!name || !email || !password) {
    return false;
  }
  return true;
};

const isValidEmail = (email) => {
  const regexEmail = /\b[\w.-]+@[a-z]+.\w{2,4}\b/;
  if (!regexEmail.test(email)) {
   return false;
  }
  return true;
};

const createUser = async ({ name, email, password, role }) => {
  const fieldValid = requiredFields(name, email, password);
  const emailValid = isValidEmail(email);
  
  if (!fieldValid || !emailValid) {
    return { message, status: 400 };
  }
  const existEmail = await UserModel.findByEmail(email);
  if (existEmail) {
    return {
      message: 'Email already registered',
      status: 400,
    };
  }
  const { id } = await UserModel.createUser({
    name, email, password, role,
  });
  return { id, name, email, password, role };
};

module.exports = {
  createUser,
};
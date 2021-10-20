const userModel = require('../models/userModel');

const STATUS_BAD_REQUEST = 400;
const STATUS_CONFLICT = 409;

const validateLogin = (name, email, password) => {
  if (!name || !email || !password) {
    return {
      err: {
        status: STATUS_BAD_REQUEST,
        message: { message: 'Invalid entries. Try again.' },
      },
    };
  }
};

const validateEmail = (email) => {
  const regexEmail = new RegExp(/\S+@\S+\.\S+/);
  const validEmail = regexEmail.test(email);

  if (!validEmail) {
    return {
      err: {
        status: STATUS_BAD_REQUEST,
        message: { message: 'Invalid entries. Try again.' },
      },
    };
  }
};

const existEmail = async (email) => {
  const filterEmail = await userModel.getByUser(email);

  if (filterEmail) { 
    return {
      err: {
        status: STATUS_CONFLICT,
        message: { message: 'Email already registered' },
      },
    };
  }
};

async function registerUser(name, email, password) {
  if (validateLogin(name, email, password)) return validateLogin(name, email, password);
  if (await existEmail(email)) return existEmail(email);
  if (validateEmail(email)) return validateEmail(email);
  
  const newUser = await userModel.registerUser(name, email, password);
  return newUser;
}

/* const registerAdmin = async (email) => {
  const userAdmin = await userModel.registerAdmin(email);

  return userAdmin;
}; */

module.exports = {
  registerUser,
  // registerAdmin,
};
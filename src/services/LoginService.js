const LoginModel = require('../models/LoginModel');

const requiredFields = (email, password) => {
  if (!email || !password) {
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

const isValidPassword = async (password) => {
  const existPassword = await LoginModel.findUser({ password });
  if (!existPassword) {
    return false;
  }
  return true;
};

const findUser = async (email, password) => {
  const fieldValid = requiredFields(email, password); 
  const emailValid = isValidEmail(email);
  const passwordValid = await isValidPassword(password);
  if (!fieldValid) {
    return {
      status: 401,
      message: 'All fields must be filled',
    };
  }
  if (!emailValid || !passwordValid) {
    return {
      status: 401,
      message: 'Incorrect username or password',
    };
  }
  await LoginModel.findUser({ email, password });
  return { email, password };
};

module.exports = {
  findUser,
};
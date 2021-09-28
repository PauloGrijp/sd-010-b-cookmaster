const userModel = require('../models/userModel');

const loginError = { message: 'Incorrect username or password' };

const getUserByEmail = async (email) => {
  const existsUser = await userModel.getUserByEmail(email);
  return existsUser;
};

const validateFields = async (userEmail, userPassword) => {
  if (!userEmail || !userPassword) {
    loginError.message = 'All fields must be filled';
    return loginError;
  }

  const validateEmail = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  if (!validateEmail.test(userEmail) || userPassword.length < 8) {
    loginError.message = 'Incorrect username or password';
    return loginError;
  }
};

const validateLogin = async (userEmail, userPassword) => {
  const validateEntries = await validateFields(userEmail, userPassword);
  if (validateEntries) return validateEntries;

  const existsUser = await getUserByEmail(userEmail);
  if (existsUser.length === 0) return loginError;

  const { _id, email, role, password } = existsUser[0];

  if (email === userEmail && password === userPassword) {
    const payload = { _id, email, role };
    return payload;
  }

  return loginError;
};

module.exports = { validateLogin };

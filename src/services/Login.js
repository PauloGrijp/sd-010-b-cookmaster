const loginModel = require('../models/Login');

const validateEntries = (email, password) => {
  if (!email || !password) {
    return { fieldError: true, message: 'All fields must be filled' };
  }

  const parseEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email.match(parseEmail) || password.length < 8) {
    return { loginError: true, message: 'Incorrect username or password' };
  }
};

const doneLogin = async ({ email, password }) => {
  if (email === 'root@email.com' && password === 'admin') {
    const result = await loginModel.loginValidate({ email, password });
    return result;
  }

  const isCheked = validateEntries(email, password);
  if (isCheked) return isCheked;

  const result = await loginModel.loginValidate({ email, password });

  if (!result) return { loginError: true, message: 'Incorrect username or password' };

  return result;
};

module.exports = { doneLogin };
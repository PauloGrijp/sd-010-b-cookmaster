const loginModel = require('../models/loginModel');

const loginRequired = (email, password) => {
  if (!email || !password) {
    return 'error_required_field';
  }
};

const validateEmail = (email) => {
  const regexEmail = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  const validEmail = regexEmail.test(email);

  if (!validEmail) {
    return 'error_invalid_field';
  }
};

const validatePassword = (password) => {
  if (password.length < 7) {
    return 'error_invalid_field';
  }
};

async function login(email, password) {
  if (loginRequired(email, password)) return loginRequired(email, password);
  if (validateEmail(email)) return validateEmail(email);
  if (validatePassword(password)) return validatePassword(password);

  const newUser = await loginModel.login(email, password);
  return newUser;
}

module.exports = {
  login,
};

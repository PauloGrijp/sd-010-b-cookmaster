const loginModels = require('../models/loginModels');

// Validações do login
const validateEmailPassword = (email, password) => {
  if (!email || !password) {
    return false;
  }
  return true;
};

const validateFormatEmail = (email) => {
  const regexEmail = /\b[\w.-]+@[a-z]+.\w{2,4}\b/;
  if (!regexEmail.test(email)) {
    return false;
  }
  return true;
};

const validatePassword = (login, passwordReq) => {
  if (!login) {
    return false;
  }
  const { password } = login;
  
  if (password !== passwordReq) {
    return false;
  }
  return true;
};

const findLogin = async ({ email, password }) => {
  const validEmail = validateFormatEmail(email);
  const validLoginFields = validateEmailPassword(email, password);
  if (!validLoginFields) {
    return { message: 'All fields must be filled' };
  }
  if (!validEmail) {
    return { message: 'Incorrect username or password' };
  }
  const login = await loginModels.findLogin({ email, password });
  const validPassord = validatePassword(login, password);
  if (!validPassord) {
    return { message: 'Incorrect username or password' };
  }
  return login;
};

module.exports = {
  findLogin,
};
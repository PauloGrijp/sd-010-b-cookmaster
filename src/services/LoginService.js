const LoginModel = require('../models/LoginModel');

const requiredFields = (email, password) => {
  if (!email || !password) {
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

const isValidPassword = (sendLogin, sendPassword) => {
  if (!sendLogin) {
    return false;
  }
  const { password } = sendLogin;
  
  if (password !== sendPassword) {
    return false;
  }
  return true;
};

const findUser = async ({ email, password }) => {
  const fieldValid = requiredFields(email, password);
  
  if (!fieldValid) {
    return { code: 401, message: 'All fields must be filled' };
  }
  
  const emailValid = isValidEmail(email);
  
  if (!emailValid) {
    return { code: 401, message: 'Incorrect username or password' };
  }

  const login = await LoginModel.findUser({ email, password });  
  const passwordIsValid = isValidPassword(login, password);

  if (!passwordIsValid) {
    return { code: 401, message: 'Incorrect username or password',
    };
  }
  
  return login;
};

module.exports = {
  findUser,
};
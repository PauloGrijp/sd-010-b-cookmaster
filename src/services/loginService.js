const loginModel = require('../models/loginModel');

// req 2
// Verifica se o campo email ou password são preenchidos
const loginFieldsValidation = (email, password) => {
  if (!email || !password) {
    return false;
  }
  return true;
};

// req 2
// Verifica se o email é válido
const emailFormatValidation = (email) => {
  const regexEmail = /[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/;
  if (!regexEmail.test(email)) {
    return false;
  }
  return true;
};

// req 2
const passwordValidation = async (user, filledPassword) => {
  if (!user) {
    return false;
  }

  const { password } = user;

  if (password !== filledPassword) {
    return false;
  }
  return true;
};

// req 2
const findUserByLoginValidation = async ({ email, password }) => {
  const validatedLoginFields = loginFieldsValidation(email, password);
  const validatedEmail = emailFormatValidation(email);
  const validatedPassword = await passwordValidation(password);

  if (!validatedLoginFields) {
    return { message: 'All fields must be filled' };
  }

  if (!validatedEmail) {
    return { message: 'Incorrect username or password' };
  }

  if (!validatedPassword) {
    return { message: 'Incorrect username or password' };
  }
  
  const login = await loginModel.findUserByLogin({ email, password });
  return login;
};

module.exports = {
  findUserByLoginValidation,
};

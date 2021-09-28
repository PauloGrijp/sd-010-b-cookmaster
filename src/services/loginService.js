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
const passwordValidation = (user, filledPassword) => {
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

  if (!validatedLoginFields) {
    return { message: 'All fields must be filled' };
  }

  const login = await loginModel.findUserByLogin({ email, password });
  const validatedPassword = passwordValidation(login, password);

  if (!validatedPassword || !validatedEmail) {
    return { message: 'Incorrect username or password' };
  }

  return login;
};

module.exports = {
  findUserByLoginValidation,
};

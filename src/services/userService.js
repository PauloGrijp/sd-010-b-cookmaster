const userModel = require('../model/usersModel');

const regexEmail = /\S+@\S+\.\S+/;
const blank = (name, email, password) => (!name || !email || !password);
const validateEmail = (email) => !regexEmail.test(email);
const alreadyExists = async (email) => {
  const { email: emaildb } = await userModel.findByEmail(email) || false;
  if (emaildb === email) { return true; }
  return false;
};
 
const errorMessage = {
  code: 400,
  message: 'Invalid entries. Try again.',
};

const erroEmailExists = {
  code: 409,
  message: 'Email already registered',
};

const userIsNotValid = async ({ name, email, password }) => {
  switch (true) {
    case (blank(name, email, password)): return errorMessage;
    case (validateEmail(email)): return errorMessage;
    case (await alreadyExists(email)): return erroEmailExists;
    default: return false;
  }
};

const create = async (user) => {
  if (await userIsNotValid(user)) { return userIsNotValid(user); }
  return userModel.create(user);
};

module.exports = {
  create,
};
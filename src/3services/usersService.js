const { createUsersModel, showByEmailUsersModel } = require('../4models/usersModel');
const { createToken } = require('../5middleware/logintoken');

const emailRegex = /\S+@\S+\.\S+/; 
const invalid = { status: 400, message: 'Invalid entries. Try again.' };
const invalidEmail = { status: 409, message: 'Email already registered' };
const notEmailOrPassword = { status: 401, message: 'All fields must be filled' };
const invalidAll = { status: 401, message: 'Incorrect username or password' };

const validate = {
  isValid: (name, email, password) => (!name || !email || !password),
  emailvaliud: (email) => (!emailRegex.test(email)),
};

const validaEmail = async (email) => {
  const answer = await showByEmailUsersModel(email);
  if (answer !== null) { 
    return true; 
  }
  return false;
};

const validaPassword = async (email, password) => {
  const answer = await showByEmailUsersModel(email);
  if (answer.password === password) {
    return true;
  }
  return false;
};

const createUsersService = async (user) => {
  const { name, email, password, role = 'user' } = user;
  switch (true) {
    case validate.isValid(name, email, password):
      return invalid;
    case validate.emailvaliud(email):
      return invalid;
    case await validaEmail(email):
      return invalidEmail;
    default:
      return createUsersModel({ name, email, password, role });
  }
};

const createusers = async (data) => {
  const { email, password } = data;
  if (!email || !password) { return notEmailOrPassword; }
  const emailValid = await validaEmail(email);
  if (!emailValid) { return invalidAll; }
  const passwordValid = await validaPassword(email, password);
  console.log(passwordValid);
  if (!passwordValid) { return invalidAll; }

  const answer = await showByEmailUsersModel(email);
  const { _id, role } = answer;
  return createToken({ email, _id, role });
};

module.exports = {
  createUsersService,
  createusers,
};
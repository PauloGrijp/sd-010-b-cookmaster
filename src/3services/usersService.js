const { createUsersModel, showByEmailUsersModel } = require('../4models/usersModel');

const emailRegex = /\S+@\S+\.\S+/; 
const invalid = { status: 400, message: 'Invalid entries. Try again.' };
const invalidEmail = { status: 409, message: 'Email already registered' };

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

module.exports = {
  createUsersService,
};
const Users = require('../models/Users');

const BAD_REQUEST = 'bad_request';
const CONFLICT = 'conflict';

const ifNameEmailPasswordExists = (name, email, password) => {
  if (!name || !email || !password) {
    return {
      codeError: BAD_REQUEST,
      isErrorMessage: 'Invalid entries. Try again.',
    }; 
  }

  return true;
};

const ifEmailIsValid = (email) => {
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!validEmail.test(email)) {
    return {
      codeError: BAD_REQUEST,
      isErrorMessage: 'Invalid entries. Try again.',
    }; 
  }

  return true;
};

const ifEmailIsUnique = async (email) => {
  const allUsers = await Users.getAllUsers();

  const comparingEmails = allUsers.find((user) => user.email === email);
  if (comparingEmails) {
    return {
      codeError: CONFLICT,
      isErrorMessage: 'Email already registered',
    }; 
  }

  return true;
};

module.exports = {
  ifNameEmailPasswordExists,
  ifEmailIsValid,
  ifEmailIsUnique,
};

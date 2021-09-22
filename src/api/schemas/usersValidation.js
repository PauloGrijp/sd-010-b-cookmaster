const Users = require('../models/Users');

const BAD_REQUEST = 'bad_request';
const CONFLICT = 'conflict';
const UNAUTHORIZED = 'unauthorized';

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
  if (allUsers.isErrorMessage) return { isErrorMessage: allUsers.isErrorMessage };

  const comparingEmails = allUsers.find((user) => user.email === email);
  if (comparingEmails) {
    return {
      codeError: CONFLICT,
      isErrorMessage: 'Email already registered',
    }; 
  }

  return true;
};

const ifEmailPasswordExists = (email, password) => {
  if (!email || !password) {
    return {
      codeError: UNAUTHORIZED,
      isErrorMessage: 'All fields must be filled',
    };
  }

  return true;
};

const ifEmailPasswordValid = async (email, password) => {
  const allUsers = await Users.getAllUsers();
  if (allUsers.isErrorMessage) return { isErrorMessage: allUsers.isErrorMessage };

  const validatingUser = allUsers.find((user) => user.email === email);
  const validatingPassword = !validatingUser ? false : validatingUser.password === password;
  if (!validatingUser || !validatingPassword) {
    return {
      codeError: UNAUTHORIZED,
      isErrorMessage: 'Incorrect username or password',
    };
  }

  return validatingUser;
};

module.exports = {
  ifNameEmailPasswordExists,
  ifEmailIsValid,
  ifEmailIsUnique,
  ifEmailPasswordExists,
  ifEmailPasswordValid,
};

const userModel = require('../models/usersModel');

const validUserName = (name) => {
  const lengtnname = name.length;
  if (!name || lengtnname < 2) {
    const isValidName = {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
    throw isValidName;
  }
};

const validUserEmail = (email) => {
  const isEmailValid = new RegExp(/\w+@[a-zA-Z]+\.[a-zA-Z]{2,3}/).test(email);
  if (!isEmailValid) {
    throw new Error({
      status: 400,
      message: 'Invalid entries. Try again.',
    });
  }
};

const validUserPassWord = (password) => {
  if (!password) {
    throw Error({
      status: 400,
      message: 'Invalid entries. Try again.',
    });
  }
};

const emailExists = async (email) => {
  const user = await userModel.userByEmail(email);
  if (user) {
    throw Error({
      status: 409,
      message: 'Email already registered',
    });
  }
};

const addUser = async (name, email, password) => {
  validUserName(name);
  validUserEmail(email);
  validUserPassWord(password);
  emailExists(email);

  await userModel.addUser(name, email, password);
    return { name, email };
};

module.exports = {
  addUser,
};
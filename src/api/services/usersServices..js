const userModel = require('../models/usersModel');

const validUserName = (name) => {
  const lengtnname = name.length;
  if (!name || lengtnname < 2) {
     const BAD_NAME = {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  throw BAD_NAME;
  }
};

const validUserEmail = (email) => {
  const isEmailValid = new RegExp(/\w+@[a-zA-Z]+\.[a-zA-Z]{2,3}/).test(email);
  if (!isEmailValid) {
    const BAD_EMAIL = {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  throw BAD_EMAIL;
  }
};

const validUserPassWord = (password) => {
  if (!password) {
    const BAD_PASSWORD = {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  throw BAD_PASSWORD;
  }
};

const emailExists = async (email) => {
    const user = await userModel.userByEmail(email);
    return user;
};

const addUser = async (name, email, password) => {
  validUserName(name);
  validUserEmail(email);
  validUserPassWord(password);
  const emailExist = await emailExists(email);
    if (emailExist) {
      const BAD_EMAIL = {
        status: 409,
        message: 'Email already registeres',
      };
    throw BAD_EMAIL;
    }

   const result = await userModel.addUser(name, email, password);
   delete result.user.password;
   return result;
};

const userByAll = async () => {
  const result = await userModel.userByAll();
  return result;
};

module.exports = {
  addUser,
  userByAll,
};
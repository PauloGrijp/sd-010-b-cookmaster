const userModel = require('../models/usersModel');

const BAD_REQUEST = {
  status: 400,
  message: 'Invalid entries. Try again.',
};

const BAD_CONFLICT = {
  status: 409,
  message: 'Email already registered',
};

const validUserName = (name) => {
  if (!name) throw BAD_REQUEST;
};

const validUserEmail = (email) => {
  const isEmailValid = new RegExp(/\w+@[a-zA-Z]+\.[a-zA-Z]{2,3}/).test(email);
  if (!isEmailValid) throw BAD_REQUEST;
};

const validUserPassWord = (password) => {
  if (!password) throw BAD_REQUEST;
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
    if (emailExist) throw BAD_CONFLICT;

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
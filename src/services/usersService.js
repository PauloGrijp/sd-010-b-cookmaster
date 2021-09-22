const model = require('../models/usersModel');

const incorrect = 'Incorrect username or password';
const reqFields = 'All fields must be filled';

const createUser = async ({ name, email, password, role, id }) => {
  const user = await model.createUser({ name, email, password, role, id });
  return user;
};

const userEmail = ({ email }) => {
  if (!email) {
    return { error: true, message: reqFields, status: 401 };
  }
  const regEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  if (!regEmail.test(email)) {
    return { error: true, message: incorrect, status: 401 };
  }
  return false;
};

const userPassword = ({ password }) => {
  if (password === undefined) {
    return { error: true, message: reqFields, status: 401 };
  }
  if (password.length < 6) {
    return { error: true, message: incorrect, status: 401 };
  }
  return false;
};

const userLogin = async ({ email, password }) => {
  const invalidEmail = userEmail({ email });
  console.log('aaaaaa', invalidEmail);
  if (invalidEmail) {
    return invalidEmail;
  }
  const invalidPassword = userPassword({ password });
  console.log('bbbbbbbb', invalidPassword);
  if (invalidPassword) {
    return invalidPassword;
  }
  const loginUser = await model.login(email, password);
  if (!loginUser) {
    return { error: true, message: incorrect, status: 401 };
  }
  return loginUser;
};

module.exports = {
  createUser,
  userLogin,
};

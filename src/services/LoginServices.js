const ModelLogin = require('../models/LoginModels');
const ModelUser = require('../models/UsersModels');

const loginRequired = (email, password) => {
  if (!email || !password) {
    return {
      err: {
        status: 401,
        message: { message: 'All fields must be filled' },
      },
    };
  }
};

const validateEmail = async (email) => {
  const regexEmail = /\S+@\S+\.\S+/;
  const validEmail = regexEmail.test(email);
  const filterEmail = await ModelUser.getByEmail(email);

  if (!validEmail || !filterEmail) {
    return {
      err: {
        status: 401,
        message: { message: 'Incorrect username or password' },
      },
    };
  }
};

const validatePassword = (password) => {
  if (typeof password !== 'string' || password.length < 7) {
    return {
      err: {
        status: 401,
        message: { message: 'Incorrect username or password' },
      },
    };
  }
};

async function login(email, password) {
  if (loginRequired(email, password)) return loginRequired(email, password);
  if (await validateEmail(email)) return validateEmail(email);
  if (validatePassword(password)) return validatePassword(password);

  const user = await ModelLogin.login(email, password);
  return user;
}

module.exports = {
  login,
};
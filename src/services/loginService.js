const loginModel = require('../models/loginModel');
const userModel = require('../models/userModel');

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

/* const existEmail = async (email) => {
  const filterEmail = await userModel.getByUser(email);

  if (filterEmail) { 
    return {
      err: {
        status: 401,
        message: { message: 'Email already registered' },
      },
    };
  }
}; */

const validateEmail = async (email) => {
  const regexEmail = new RegExp(/\S+@\S+\.\S+/);
  const validEmail = regexEmail.test(email);
  const filterEmail = await userModel.getByUser(email);

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
  
  const newUser = await loginModel.login(email, password);
  return newUser;
}

module.exports = {
  login,
};

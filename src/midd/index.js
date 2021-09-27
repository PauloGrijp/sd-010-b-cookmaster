const userModel = require('../models/userModel');

const nameIsValid = (name) => {
  const lengtnname = name.length;
    if (!name || lengtnname < 2) {
      const isValidName = {
        status: 400,
        message: 'Invalid entries. Try again.',
      };
      throw isValidName;
    }
  };
  
const emailIsValid = (email) => {
  const isEmailValid = new RegExp(/\w+@[a-zA-Z]+\.[a-zA-Z]{2,3}/).test(email);
    if (!isEmailValid) {
      throw new Error({
        status: 400,
        message: 'Invalid entries. Try again.',
      });
    }
  };
  
const passwordIsValid = (password) => {
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

module.expots = {
  emailExists,
  passwordIsValid,
  nameIsValid,
  emailIsValid,
};

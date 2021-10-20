const Model = require('../models/UsersModels');

const validateLogin = (name, email, password) => {
  if (!name || !email || !password) {
    return {
      err: {
        status: 400,
        message: { message: 'Invalid entries. Try again.' },
      },
    };
  }
};

const validateEmail = (email) => {
  const regexEmail = new RegExp(/\S+@\S+\.\S+/);
  const validEmail = regexEmail.test(email);

  if (!validEmail) {
    return {
      err: {
        status: 400,
        message: { message: 'Invalid entries. Try again.' },
      },
    };
  }
};

const existEmail = async (email) => {
  const filterEmail = await Model.getByEmail(email);

  if (filterEmail) { 
    return {
      err: {
        status: 409,
        message: { message: 'Email already registered' },
      },
    };
  }
};

async function createItem(name, email, password) {
  if (validateLogin(name, email, password)) return validateLogin(name, email, password);
  if (await existEmail(email)) return existEmail(email);
  if (validateEmail(email)) return validateEmail(email);

  const user = await Model.createItem(name, email, password);
  return user;
}

module.exports = {
  createItem,
}; 
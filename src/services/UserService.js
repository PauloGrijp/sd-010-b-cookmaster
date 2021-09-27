const UsersModel = require('../models/UsersModel');

const validateEmail = (email) => {
  if (!email || !email.includes('@') || !email.includes('.com')) {
    return true;
  }
  return false;
};

const createUser = async (name, email, password) => {
  const emailIsNotValide = validateEmail(email);

  if (!name || !password || emailIsNotValide) {
    return { message: 'Invalid entries. Try again.', status: 400 };
  }

  const emailIsNotUnique = await UsersModel.findEmail(email);

  if (emailIsNotUnique) {
    return { message: 'Email already registered', status: 409 };
  }

  const userCreated = await UsersModel.createUser(name, email);
  return userCreated;
};

module.exports = {
  createUser,
};
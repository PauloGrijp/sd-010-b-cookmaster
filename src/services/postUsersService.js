const { usersModel } = require('../models');

const postUsers = async (name, email, password) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const validateEmail = emailRegex.test(email);
  if (!name || !email || !password || !validateEmail) {
    return { err: { status: 400, message: 'Invalid entries. Try again.' } }; 
  }
  return usersModel.postUser(name, email, password);
};

module.exports = { postUsers };

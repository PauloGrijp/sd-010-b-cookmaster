const UsersModel = require('../models/UsersModel');

const response = { message: 'Invalid entries. Try again.', status: 400 };

const validateEmail = (email) => {
  if (!email || !email.includes('@') || !email.includes('.com')) {
    return true;
  }

  return false;
};

const create = async (name, email, password) => {  
  const respEmail = validateEmail(email);

  if (!name || !password || respEmail) {
    return response;
  }

  const emailNotUnique = await UsersModel.findEmail(email);

  if (emailNotUnique) {
    const resp = { message: 'Email already registered', status: 409 };
    return resp;
  }

  const userCreated = await UsersModel.create(name, email, password);

  delete userCreated.password;

  return userCreated;
};

module.exports = {
  create,
};
const usersModel = require('../models/usersModel');

const validate = async (name, email, password) => {
  if (!name || !email || !password) {
    return {
      err: { status: 400, message: 'Invalid. Try again.' } };
    }

  const emailValidation = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  if (emailValidation.test(email) === false) {
    return {
      err: { status: 400, message: 'Invalid. Try again.' } };
  }
};

const create = async (name, email, password) => {
  const result = await validate(name, email, password);
  if (result) {
    return result;
  }

  const exists = await usersModel.findByEmail(email);
  if (exists) {
    return {
      err: { status: 409, message: 'Email already registered' } };
  }

  const user = await usersModel.create(name, email, password);
  return { user };
};

module.exports = {
  create,
};

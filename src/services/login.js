const models = require('../models/users');

const login = async (user) => {
  const { email, password } = user;

  const error = new Error();
  error.err = {
    code: 401,
    message: 'All fields must be filled',
  };

  if (!email || !password) throw error;

  const userExists = await models.userExists(email);

  const invalidError = new Error();
  invalidError.err = {
    code: 401,
    message: 'Incorrect username or password',
  };

  if (!userExists || userExists.password !== password) throw invalidError;

  return userExists;
};

module.exports = {
  login,
};

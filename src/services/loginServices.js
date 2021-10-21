const { usersModels } = require('../models');

const login = async (credentials) => {
  const { email, password } = credentials;
  const user = await usersModels.findByEmail(email);
  if (!user || (user.password !== password)) {
    return {
      error: {
        code: 401,
        message: 'Incorrect username or password',
      },
    };
  }
  return user;
};

module.exports = {
  login,
};

const models = require('../models/users');

const login = async (user) => {
  const { name, password } = user;

  const userExists = await models.getUser(name);

  const error = new Error();
  error.err = {
    status: 200,
    message: 'usuário ou senha inválida',
  };

  if (!userExists || userExists.password !== password) throw error;
};

module.exports = {
  login,
};

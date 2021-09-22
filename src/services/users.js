const { add } = require('../models/users');

const addUser = async (email, senha, nome) => {
  const newUser = await add(email, senha, nome);

  if (!newUser) {
    return null;
  }

  return newUser;
};

module.exports = {
  addUser,
};

const { add, checkEmailUniquity, login } = require('../models/users');

const addUser = async (email, senha, nome) => {  
  const emailUniquity = await checkEmailUniquity(email);
  
  if (emailUniquity) return { message: 'Email already registered' };
  
  const newUser = await add(email, senha, nome);
  return newUser;
};

const userLogin = async (email, password) => {
  const checkUser = await login(email, password);

  return checkUser;
};

module.exports = {
  addUser,
  userLogin,
};

const { add, checkEmailUniquity } = require('../models/users');

const addUser = async (email, senha, nome) => {  
  const emailUniquity = await checkEmailUniquity(email);
  
  if (emailUniquity) return { message: 'Email already registered' };
  
  const newUser = await add(email, senha, nome);
  return newUser;
};

module.exports = {
  addUser,
};

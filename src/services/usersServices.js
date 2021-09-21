const usersModel = require('../models/usersModel');

const addUser = async (name, email, password) => {
  const userExists = await usersModel.findUser(email);
  
  if (userExists) return { message: 'Email already registered' };
  
  const createdUser = await usersModel.addUser(name, email, password);
  
  return createdUser;
};

module.exports = {
  addUser,
};
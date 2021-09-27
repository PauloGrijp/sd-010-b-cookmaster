const usersModel = require('../models/usersModel');

const incorrectData = {
  error: {
    status: 401,
    message: 'Incorrect username or password',
  },
};

const fieldsEmpty = {
  error: {
    status: 401,
    message: 'All fields must be filled',
  },
};

const getUser = async (userData) => {
  const { email: userEmail, password: userPassword } = userData;
  if (!userEmail || !userPassword) return fieldsEmpty;

  const userFound = await usersModel.getUser(userEmail);
  const passwordCheck = userFound.password === userPassword;
  
  if (!userFound || !passwordCheck) return incorrectData;

  return { ...userFound };
};

module.exports = {
  getUser,
};
const userModel = require('../models/userModel');

const uniqueEmail = async (email) => userModel.uniqueEmail(email);

const signUp = async ({ name, password, email }) => userModel.signUp({ name, password, email });

const findUser = async (email) => userModel.findUser(email);

// const getUser = async (email) => userModel.findUser(email);

module.exports = {
  uniqueEmail,
  signUp,
  findUser,
};
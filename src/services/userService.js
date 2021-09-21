const userModel = require('../models/userModel');

const uniqueEmail = async (email) => userModel.uniqueEmail(email);

const signUp = async ({ name, password, email }) => userModel.signUp({ name, password, email });

module.exports = {
  uniqueEmail,
  signUp,
};
const userModel = require('../models/userModel');
const validation = require('../midd/index');

const createUser = async (name, email, password) => {
    validation.validUserEmail(email);
    validation.validUserPassword(password);
    validation.validUserName(name);
    validation.emailExists(email);
    await userModel.createUser(name, email, password);
      return { name, email };
  };
  
  module.exports = createUser
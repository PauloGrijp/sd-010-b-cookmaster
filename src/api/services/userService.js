const userModel = require('../models/userModel');
const validation = require('../midd/index');

const createUser = async (name, email, password) => {
    validation.emailIsValid(email);
    validation.passwordIsValid(password);
    validation.nameIsValid(name);
    validation.emailExists(email);
    await userModel.createUser(name, email, password);
      return { name, email };
  };
  
module.exports = {
  createUser,
};
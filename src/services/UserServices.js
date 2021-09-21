const UserModel = require('../models/UserModel');

const requiredFields = (name, email, password) => {
  if (!name || !email || !password) {
    return false;
  }
  return true;
};


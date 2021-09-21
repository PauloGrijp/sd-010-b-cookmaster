const UserModel = require('../models/UserModel');

const isValidName = (name) => {
  if (!name) {
    return {
      message: 'Invalid entries. Try again'
    }
  }
  
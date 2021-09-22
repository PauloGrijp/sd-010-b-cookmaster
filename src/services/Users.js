const User = require('../models/Users');
const { CONFLICT } = require('../utils/statusCodes');

const createUser = async (data) => {
  const userExists = await User.getUserByEmail(data.email);

  if (userExists) return { code: CONFLICT, message: 'Email already registered' };

  const user = await User.createUser(data);

  return user;
};

module.exports = {
  createUser,
}; 
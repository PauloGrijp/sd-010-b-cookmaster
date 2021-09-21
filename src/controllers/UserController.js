const StatusCodes = require('http-status-codes');
const UserService = require('../services/UserService');

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;  
  
  const { id, message } = await UserService.createUser({ name, email, password, role });
  
  if (message === 'Invalid entries. Try again.') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message,
  });
  }
  if (message === 'Email already registered') {
    return res.status(StatusCodes.CONFLICT).json({
      message,
    });
  }
  res.status(StatusCodes.CREATED).json({ user: {
    name, email, role: 'user', _id: id,
  } });
};

module.exports = {
  createUser,
};

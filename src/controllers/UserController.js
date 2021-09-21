const StatusCodes = require('http-status-codes');
const UserService = require('../services/UserService');

const createUser = async (req, res) => {
  const { body } = req;
  
  const { id, message } = await UserService.createUser(body);
  
  if (message) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message,
  });
  }
  res.status(StatusCodes.CREATED).json({ user: {
    body, _id: id,
  } });
};

module.exports = {
  createUser,
};

const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  const newUser = req.body;
  const { status, createdUser } = await usersService.createUser(newUser);
  res.status(status).json({ user: createdUser });
};

module.exports = {
  createUser,
};

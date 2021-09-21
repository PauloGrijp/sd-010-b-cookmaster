const { StatusCodes } = require('http-status-codes');
const usersService = require('../services/usersServices');

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await usersService.addUser(name, email, password);

    if (user.message) return res.status(StatusCodes.CONFLICT).json(user);

    return res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = { addUser };

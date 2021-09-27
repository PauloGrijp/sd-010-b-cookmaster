const StatusCodes = require('http-status-codes');
const userService = require('../services/userService');

// req 1
const userCreate = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { id, message } = await userService.userCreateValidation({
      name, email, password, role });

    if (message === 'Invalid entries. Try again.') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    }

    if (message === 'Email already registered') {
      return res.status(StatusCodes.CONFLICT).json({ message });
    }

    return res.status(StatusCodes.CREATED)
      .json({ user: { _id: id, name, email, role: 'user' } });
};

module.exports = {
  userCreate,
};

const { StatusCodes } = require('http-status-codes');

const userService = require('../services/user');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.createUser(name, email, password);
    if (!user) throw Error;
    if (user.message === 'Invalid entries. Try again.') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: user.message });
    }
    if (user.message === 'Email already registered') {
      return res.status(StatusCodes.CONFLICT).json({ message: user.message });
    }
    delete user.password;
    res.status(StatusCodes.CREATED).json({ user });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro interno', error: err });
  }
};

module.exports = {
  createUser,
};

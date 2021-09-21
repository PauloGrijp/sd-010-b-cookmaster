const { StatusCodes } = require('http-status-codes');
const service = require('../services/usersService');

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await service.createUser({ name, email, password, role });
    return res.status(StatusCodes.CREATED).json({
      user: {
        name,
        email,
        role: 'user',
        _id: user.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser };
